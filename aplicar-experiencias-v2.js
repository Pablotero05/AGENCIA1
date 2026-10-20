#!/usr/bin/env node
/**
 * Selector Adventure / Premium a pantalla completa en "Todas las rutas" (v2)
 * Páginas: es/pages/rutas.html (+ en/pages/rutas.html y por/pages/rutas.html si existen)
 *
 * Uso (desde la raíz del repo AGENCIA1):
 *   node aplicar-experiencias-v2.js              -> aplica (con backup automático)
 *   node aplicar-experiencias-v2.js --dry-run    -> simula, sin escribir
 *   node aplicar-experiencias-v2.js --restore    -> vuelve atrás con el último backup
 *   node aplicar-experiencias-v2.js --restore <nombre-backup>
 *   node aplicar-experiencias-v2.js --list
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BACKUP_ROOT = path.join(ROOT, '.backup-experiencias');
const MARK = 'data-exp-v2';
const RC_MARK = 'sts-exp-v2';
const OLD_MARK = 'data-exp-selector';
const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const RC_PATH = 'scripts/components/routeCards.js';

const ROUTE_CARDS_B64 = `
Lyogc3RzLWV4cC12MiAqLwooZnVuY3Rpb24gKCkgewogIGNvbnN0IGdldExhbmdGcm9tUGF0aCA9IChwYXRoKSA9PiB7CiAgICBj
b25zdCBwID0gcGF0aC50b0xvd2VyQ2FzZSgpOwogICAgaWYgKHAuaW5jbHVkZXMoJy9lbi8nKSB8fCBwLmVuZHNXaXRoKCcvZW4n
KSkgcmV0dXJuICdlbic7CiAgICBpZiAocC5pbmNsdWRlcygnL3Bvci8nKSB8fCBwLmluY2x1ZGVzKCcvcHQvJykgfHwgcC5lbmRz
V2l0aCgnL3BvcicpIHx8IHAuZW5kc1dpdGgoJy9wdCcpKSByZXR1cm4gJ3Bvcic7CiAgICByZXR1cm4gJ2VzJzsKICB9OwoKICBj
b25zdCBsYWJlbHMgPSB7CiAgICBlczogeyBsb2FkaW5nOiAiQ2FyZ2FuZG8gcnV0YXMuLi4iLCBlcnJvcjogIk5vIHNlIHB1ZGll
cm9uIGNhcmdhciBsYXMgcnV0YXMiLCByZXRyeTogIlJlaW50ZW50YXIiLCBmcm9tOiAiRGVzZGUiLCBkZXRhaWxzOiAiVmVyIGRl
dGFsbGVzIOKGkiIsIGFkdmVudHVyZTogIkFkdmVudHVyZSIsIHByZW1pdW06ICJQcmVtaXVtIiB9LAogICAgZW46IHsgbG9hZGlu
ZzogIkxvYWRpbmcgcm91dGVzLi4uIiwgZXJyb3I6ICJDb3VsZCBub3QgbG9hZCByb3V0ZXMiLCByZXRyeTogIlJldHJ5IiwgZnJv
bTogIkZyb20iLCBkZXRhaWxzOiAiVmlldyBkZXRhaWxzIOKGkiIsIGFkdmVudHVyZTogIkFkdmVudHVyZSIsIHByZW1pdW06ICJQ
cmVtaXVtIiB9LAogICAgcG9yOiB7IGxvYWRpbmc6ICJDYXJyZWdhbmRvIHJvdGFzLi4uIiwgZXJyb3I6ICJOw6NvIGZvaSBwb3Nz
w612ZWwgY2FycmVnYXIgYXMgcm90YXMiLCByZXRyeTogIlJlcGV0aXIiLCBmcm9tOiAiQSBwYXJ0aXIgZGUiLCBkZXRhaWxzOiAi
VmVyIGRldGFsaGVzIOKGkiIsIGFkdmVudHVyZTogIkFkdmVudHVyZSIsIHByZW1pdW06ICJQcmVtaXVtIiB9CiAgfTsKCiAgLy8g
4pyP77iPIFBSRUNJT1MgUE9SIEVYUEVSSUVOQ0lBIChlZGl0YXIgYXF1w60gYSBwb3N0ZXJpb3JpKQogIC8vIFNpIHVuYSBydXRh
IG5vIGFwYXJlY2UsIHVzYSBlbCBwcmVjaW8gYmFzZSBkZSBydXRhcy5qc29uLgogIC8vIEVqZW1wbG86IFBSSUNFX09WRVJSSURF
Uy5wcmVtaXVtWydmcmFuY2VzJ10gPSAnNTIwIOKCrC9wZXJzb25hJzsKICBjb25zdCBQUklDRV9PVkVSUklERVMgPSB7CiAgICBh
ZHZlbnR1cmU6IHt9LAogICAgcHJlbWl1bToge30KICB9OwogIGNvbnN0IEVYUEVSSUVOQ0VTID0gWydhZHZlbnR1cmUnLCAncHJl
bWl1bSddOwoKICBsZXQgYWxsUm91dGVzID0gbnVsbDsKICBsZXQgcGVuZGluZ0V4cCA9IG51bGw7CiAgY29uc3QgbGFuZyA9IGdl
dExhbmdGcm9tUGF0aCh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpOwogIGNvbnN0IHQgPSBsYWJlbHNbbGFuZ10gfHwgbGFiZWxz
LmVzOwogIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7CgogIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlQ2FyZChy
dXRhLCBleHApIHsKICAgIGNvbnN0IHRhZ3NIVE1MID0gcnV0YS50YWdzCiAgICAgIC5tYXAodGFnID0+IGAKICAgICAgICA8c3Bh
biBjbGFzcz0iYmctW3ZhcigtLXByaW1hcnktY29sb3IpXS8xMCB0ZXh0LVt2YXIoLS1wcmltYXJ5LWNvbG9yKV0gdGV4dC14cyBm
b250LW1lZGl1bSBweC0zIHB5LTEgcm91bmRlZC1mdWxsIj4KICAgICAgICAgICR7dGFnfQogICAgICAgIDwvc3Bhbj5gKQogICAg
ICAuam9pbignJyk7CiAgICBjb25zdCBwcmljZSA9IChleHAgJiYgUFJJQ0VfT1ZFUlJJREVTW2V4cF0gJiYgUFJJQ0VfT1ZFUlJJ
REVTW2V4cF1bcnV0YS5pZF0pIHx8IHJ1dGEucHJlY2lvOwogICAgY29uc3QgZXhwUGFyYW0gPSBleHAgPyBgJmV4cD0ke2V4cH1g
IDogJyc7CiAgICBjb25zdCBleHBCYWRnZSA9IGV4cAogICAgICA/IGA8ZGl2IGNsYXNzPSJhYnNvbHV0ZSB0b3AtNCByaWdodC00
Ij48c3BhbiBjbGFzcz0iJHtleHAgPT09ICdwcmVtaXVtJyA/ICdiZy1hbWJlci01MDAgdGV4dC13aGl0ZScgOiAnYmctZW1lcmFs
ZC02MDAgdGV4dC13aGl0ZSd9IHRleHQteHMgZm9udC1ib2xkIHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgdXBwZXJjYXNlIHRyYWNr
aW5nLXdpZGUiPiR7dFtleHBdfTwvc3Bhbj48L2Rpdj5gCiAgICAgIDogJyc7CgogICAgcmV0dXJuIGAKICAgICAgPGRpdiBjbGFz
cz0icm91dGUtY2FyZCBiZy13aGl0ZSByb3VuZGVkLTJ4bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LWxnIGhvdmVyOnNoYWRvdy0y
eGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGdyb3VwIHRyYW5zZm9ybSBob3ZlcjotdHJhbnNsYXRlLXktMSIKICAgICAg
ICAgICBkYXRhLWRpZmZpY3VsdHk9IiR7cnV0YS5kaWZpY3VsdGFkfSIgZGF0YS1leHBlcmllbmNlPSIke2V4cCB8fCAnJ30iPgog
ICAgICAgIDxkaXYgY2xhc3M9InJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBoLTU2Ij4KICAgICAgICAgIDxpbWcgc3JjPSIke3J1
dGEuaW1hZ2VufSIgYWx0PSIke3J1dGEubm9tYnJlfSIgY2xhc3M9InctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIGdyb3VwLWhv
dmVyOnNjYWxlLTEwNSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi01MDAiIGxvYWRpbmc9ImxhenkiPgogICAgICAgICAg
PGRpdiBjbGFzcz0iYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20tYmxhY2svNjAgdG8tdHJhbnNwYXJlbnQi
PjwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0iYWJzb2x1dGUgdG9wLTQgbGVmdC00Ij4KICAgICAgICAgICAgPHNwYW4gY2xh
c3M9IiR7cnV0YS5iYWRnZUNvbG9yfSB0ZXh0LXhzIGZvbnQtYm9sZCBweC0zIHB5LTEgcm91bmRlZC1mdWxsIj4ke3J1dGEuYmFk
Z2V9PC9zcGFuPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICAke2V4cEJhZGdlfQogICAgICAgICAgPGRpdiBjbGFzcz0iYWJz
b2x1dGUgYm90dG9tLTQgbGVmdC00Ij4KICAgICAgICAgICAgPHNwYW4gY2xhc3M9IiR7cnV0YS5kaWZpY3VsdGFkQ29sb3J9IHRl
eHQtd2hpdGUgdGV4dC14cyBmb250LWJvbGQgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZSI+
JHtydXRhLmRpZmljdWx0YWRMYWJlbH08L3NwYW4+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDxkaXYgY2xhc3M9ImFic29s
dXRlIGJvdHRvbS00IHJpZ2h0LTQgdGV4dC13aGl0ZSB0ZXh0LXJpZ2h0Ij4KICAgICAgICAgICAgPGRpdiBjbGFzcz0idGV4dC0y
eGwgZm9udC1ib2xkIj4ke3J1dGEua219PC9kaXY+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9InRleHQteHMgb3BhY2l0eS04MCI+
JHtydXRhLmRpYXN9PC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJwLTYi
PgogICAgICAgICAgPGgzIGNsYXNzPSJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LVt2YXIoLS1kYXJrLXRleHQtY29sb3IpXSBtYi0y
IiBzdHlsZT0iZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LWhlYWRpbmcpOyI+JHtydXRhLm5vbWJyZX08L2gzPgogICAg
ICAgICAgPHAgY2xhc3M9InRleHQtW3ZhcigtLWdyYXktdGV4dC1jb2xvcildIHRleHQtc20gbGVhZGluZy1yZWxheGVkIG1iLTQi
PiR7cnV0YS5kZXNjcmlwY2lvbn08L3A+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJmbGV4IGZsZXgtd3JhcCBnYXAtMyBtYi01IHRl
eHQteHMgdGV4dC1bdmFyKC0tZ3JheS10ZXh0LWNvbG9yKV0iPgogICAgICAgICAgICA8c3BhbiBjbGFzcz0iZmxleCBpdGVtcy1j
ZW50ZXIgZ2FwLTEiPjxpIGNsYXNzPSJmYS1zb2xpZCBmYS1tYXAtcGluIHRleHQtW3ZhcigtLXByaW1hcnktY29sb3IpXSI+PC9p
PiR7cnV0YS5pbmljaW99PC9zcGFuPgogICAgICAgICAgICA8c3BhbiBjbGFzcz0iZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEiPjxp
IGNsYXNzPSJmYS1zb2xpZCBmYS1mbGFnLWNoZWNrZXJlZCB0ZXh0LVt2YXIoLS1wcmltYXJ5LWNvbG9yKV0iPjwvaT4ke3J1dGEu
ZmlufTwvc3Bhbj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0iZmxleCBmbGV4LXdyYXAgZ2FwLTIgbWIt
NSI+JHt0YWdzSFRNTH08L2Rpdj4KICAgICAgICAgIDxkaXYgY2xhc3M9ImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2Vl
biBwdC00IGJvcmRlci10IGJvcmRlci1ncmF5LTEwMCI+CiAgICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgICAgPHNwYW4gY2xh
c3M9InRleHQtW3ZhcigtLWdyYXktdGV4dC1jb2xvcildIHRleHQteHMiPiR7dC5mcm9tfTwvc3Bhbj4KICAgICAgICAgICAgICA8
ZGl2IGNsYXNzPSJ0ZXh0LVt2YXIoLS1wcmltYXJ5LWNvbG9yKV0gZm9udC1ib2xkIHRleHQtbGciPiR7cHJpY2V9PC9kaXY+CiAg
ICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICA8YSBocmVmPSIvJHtsYW5nfS9wYWdlcy9ydXRhLmh0bWw/aWQ9JHtydXRhLmlk
fSR7ZXhwUGFyYW19IiBjbGFzcz0icHgtNSBweS0yLjUgYmctW3ZhcigtLXByaW1hcnktY29sb3IpXSB0ZXh0LXdoaXRlIHRleHQt
c20gZm9udC1zZW1pYm9sZCByb3VuZGVkLWxnIGhvdmVyOmJnLVt2YXIoLS1wcmltYXJ5LWJ1dHRvbi1ob3Zlci1iZy1jb2xvcild
IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBzaGFkb3ctbWQiPgogICAgICAgICAgICAgICR7dC5kZXRhaWxzfQogICAgICAg
ICAgICA8L2E+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICBgOwogIH0KCiAgZnVuY3Rp
b24gcmVuZGVyR3JpZChleHApIHsKICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm91dGVzLWdyaWQn
KTsKICAgIGlmICghZ3JpZCB8fCAhYWxsUm91dGVzKSByZXR1cm47CiAgICBncmlkLmlubmVySFRNTCA9IGFsbFJvdXRlcy5tYXAo
ciA9PiBjcmVhdGVSb3V0ZUNhcmQociwgZXhwKSkuam9pbignJyk7CiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0
b21FdmVudCgncm91dGVzTG9hZGVkJywgeyBkZXRhaWw6IHsgdG90YWw6IGFsbFJvdXRlcy5sZW5ndGgsIGV4cGVyaWVuY2U6IGV4
cCB9IH0pKTsKICB9CgogIGZ1bmN0aW9uIHNldFVybEV4cChleHAsIHB1c2gpIHsKICAgIHRyeSB7CiAgICAgIGNvbnN0IHVybCA9
IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpOwogICAgICBpZiAoZXhwKSB1cmwuc2VhcmNoUGFyYW1zLnNldCgnZXhwJywg
ZXhwKTsgZWxzZSB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgnZXhwJyk7CiAgICAgIGhpc3RvcnlbcHVzaCA/ICdwdXNoU3RhdGUn
IDogJ3JlcGxhY2VTdGF0ZSddKHsgZXhwOiBleHAgfHwgbnVsbCB9LCAnJywgdXJsLnRvU3RyaW5nKCkpOwogICAgfSBjYXRjaCAo
ZSkge30KICB9CgogIGZ1bmN0aW9uIHNlbGVjdEV4cGVyaWVuY2UoZXhwLCBvcHRzKSB7CiAgICBjb25zdCBwdXNoID0gIShvcHRz
ICYmIG9wdHMuZnJvbUhpc3RvcnkpOwogICAgaWYgKCFFWFBFUklFTkNFUy5pbmNsdWRlcyhleHApKSByZXR1cm47CiAgICBjb25z
dCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHBlcmllbmNlLXNlbGVjdG9yJyk7CiAgICBjb25zdCB3cmFw
cGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdXRlcy1saXN0LXdyYXBwZXInKTsKICAgIGlmIChzZWxlY3Rvcikgc2Vs
ZWN0b3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICAgIGlmICh3cmFwcGVyKSB3cmFwcGVyLnN0eWxlLmRpc3BsYXkgPSAnJzsK
ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWV4cC1sYWJlbF0nKS5mb3JFYWNoKGVsID0+IHsgZWwudGV4dENv
bnRlbnQgPSB0W2V4cF07IH0pOwogICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKCdleHAtc2VsZWN0LW1vZGUnKTsKICAgIHJlbmRl
ckdyaWQoZXhwKTsKICAgIGlmIChwdXNoKSBzZXRVcmxFeHAoZXhwLCB0cnVlKTsKICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDog
MCwgYmVoYXZpb3I6ICdhdXRvJyB9KTsKICB9CgogIGZ1bmN0aW9uIHJlc2V0RXhwZXJpZW5jZShvcHRzKSB7CiAgICBjb25zdCBw
dXNoID0gIShvcHRzICYmIG9wdHMuZnJvbUhpc3RvcnkpOwogICAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50
QnlJZCgnZXhwZXJpZW5jZS1zZWxlY3RvcicpOwogICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdy
b3V0ZXMtbGlzdC13cmFwcGVyJyk7CiAgICBpZiAod3JhcHBlcikgd3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwogICAg
aWYgKHNlbGVjdG9yKSBzZWxlY3Rvci5zdHlsZS5kaXNwbGF5ID0gJyc7CiAgICByb290LmNsYXNzTGlzdC5hZGQoJ2V4cC1zZWxl
Y3QtbW9kZScpOwogICAgaWYgKHB1c2gpIHNldFVybEV4cChudWxsLCB0cnVlKTsKICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDog
MCwgYmVoYXZpb3I6ICdhdXRvJyB9KTsKICB9CgogIGFzeW5jIGZ1bmN0aW9uIGxvYWRSb3V0ZXMoKSB7CiAgICBjb25zdCBncmlk
ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdXRlcy1ncmlkJyk7CiAgICBpZiAoIWdyaWQpIHJldHVybjsKCiAgICBncmlk
LmlubmVySFRNTCA9IGAKICAgICAgPGRpdiBjbGFzcz0iY29sLXNwYW4tZnVsbCBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNl
bnRlciBweS0yMCI+CiAgICAgICAgPGRpdiBjbGFzcz0idGV4dC1jZW50ZXIiPgogICAgICAgICAgPGkgY2xhc3M9ImZhLXNvbGlk
IGZhLXJvdXRlIHRleHQtNHhsIHRleHQtW3ZhcigtLXByaW1hcnktY29sb3IpXSBhbmltYXRlLXB1bHNlIG1iLTQgYmxvY2siPjwv
aT4KICAgICAgICAgIDxwIGNsYXNzPSJ0ZXh0LVt2YXIoLS1ncmF5LXRleHQtY29sb3IpXSI+JHt0LmxvYWRpbmd9PC9wPgogICAg
ICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgIGA7CgogICAgdHJ5IHsKICAgICAgY29uc3QgY2FuZGlkYXRlcyA9IFsKICAgICAg
ICBgLyR7bGFuZ30vZGF0YS9ydXRhcy5qc29uYCwKICAgICAgICBgLyR7bGFuZyA9PT0gJ2VuJyA/ICdlbicgOiAobGFuZyA9PT0g
J3BvcicgfHwgbGFuZyA9PT0gJ3B0JykgPyAncG9yJyA6ICdlcyd9L2RhdGEvcnV0YXMuanNvbmAsCiAgICAgICAgYC8ke2xhbmcg
PT09ICdlbicgPyAnZW4nIDogKGxhbmcgPT09ICdwb3InIHx8IGxhbmcgPT09ICdwdCcpID8gJ3B0JyA6ICdlcyd9L2RhdGEvcnV0
YXMuanNvbmAsCiAgICAgICAgYC9lcy9kYXRhL3J1dGFzLmpzb25gCiAgICAgIF07CgogICAgICBsZXQgcnV0YXMgPSBudWxsOwog
ICAgICBmb3IgKGNvbnN0IHVybCBvZiBjYW5kaWRhdGVzKSB7CiAgICAgICAgdHJ5IHsKICAgICAgICAgIGNvbnN0IHJlcyA9IGF3
YWl0IGZldGNoKHVybCk7CiAgICAgICAgICBpZiAocmVzLm9rKSB7CiAgICAgICAgICAgIHJ1dGFzID0gYXdhaXQgcmVzLmpzb24o
KTsKICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocnV0YXMpICYmIHJ1dGFzLmxlbmd0aCA+IDApIGJyZWFrOwogICAgICAg
ICAgfQogICAgICAgIH0gY2F0Y2ggKGUpIHt9CiAgICAgIH0KCiAgICAgIGlmICghcnV0YXMpIHRocm93IG5ldyBFcnJvcignTm8g
c2UgcHVkbyBjYXJnYXIgcnV0YXMuanNvbiBkZXNkZSBuaW5ndW5hIHJ1dGEnKTsKICAgICAgYWxsUm91dGVzID0gcnV0YXM7CiAg
ICAgIGlmIChwZW5kaW5nRXhwKSB7IGNvbnN0IHAgPSBwZW5kaW5nRXhwOyBwZW5kaW5nRXhwID0gbnVsbDsgc2VsZWN0RXhwZXJp
ZW5jZShwKTsgcmV0dXJuOyB9CgogICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHBlcmllbmNlLXNlbGVjdG9y
JykpIHsKICAgICAgICByZW5kZXJHcmlkKG51bGwpOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICBjb25zdCB3YW50ZWQg
PSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLmdldCgnZXhwJyk7CiAgICAgIGlmIChFWFBFUklF
TkNFUy5pbmNsdWRlcyh3YW50ZWQpKSBzZWxlY3RFeHBlcmllbmNlKHdhbnRlZCwgeyBmcm9tSGlzdG9yeTogdHJ1ZSB9KTsKICAg
ICAgZWxzZSByb290LmNsYXNzTGlzdC5hZGQoJ2V4cC1zZWxlY3QtbW9kZScpOwogICAgfSBjYXRjaCAoZXJyb3IpIHsKICAgICAg
Y29uc29sZS5lcnJvcignRXJyb3IgY2FyZ2FuZG8gcnV0YXM6JywgZXJyb3IpOwogICAgICBncmlkLmlubmVySFRNTCA9IGAKICAg
ICAgICA8ZGl2IGNsYXNzPSJjb2wtc3Bhbi1mdWxsIHRleHQtY2VudGVyIHB5LTE2Ij4KICAgICAgICAgIDxpIGNsYXNzPSJmYS1z
b2xpZCBmYS10cmlhbmdsZS1leGNsYW1hdGlvbiB0ZXh0LTR4bCB0ZXh0LXJlZC00MDAgbWItNCBibG9jayI+PC9pPgogICAgICAg
ICAgPHAgY2xhc3M9InRleHQtW3ZhcigtLWdyYXktdGV4dC1jb2xvcildIHRleHQtbGcgZm9udC1tZWRpdW0iPiR7dC5lcnJvcn08
L3A+CiAgICAgICAgICA8YnV0dG9uIG9uY2xpY2s9ImxvY2F0aW9uLnJlbG9hZCgpIiBjbGFzcz0ibXQtNCBweC02IHB5LTIgYmct
W3ZhcigtLXByaW1hcnktY29sb3IpXSB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC1zbSBmb250LXNlbWlib2xkIGhvdmVyOmJn
LVt2YXIoLS1wcmltYXJ5LWJ1dHRvbi1ob3Zlci1iZy1jb2xvcildIHRyYW5zaXRpb24tYWxsIj4ke3QucmV0cnl9PC9idXR0b24+
CiAgICAgICAgPC9kaXY+CiAgICAgIGA7CiAgICB9CiAgfQoKICB3aW5kb3cuc3RzU2VsZWN0RXhwZXJpZW5jZSA9IGZ1bmN0aW9u
IChleHApIHsKICAgIGlmIChhbGxSb3V0ZXMpIHNlbGVjdEV4cGVyaWVuY2UoZXhwKTsKICAgIGVsc2UgcGVuZGluZ0V4cCA9IGV4
cDsKICB9OwogIHdpbmRvdy5zdHNSZXNldEV4cGVyaWVuY2UgPSAoKSA9PiByZXNldEV4cGVyaWVuY2UoKTsKICB3aW5kb3cuYWRk
RXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiB7CiAgICBpZiAoIWFsbFJvdXRlcyB8fCAhZG9jdW1lbnQuZ2V0RWxlbWVu
dEJ5SWQoJ2V4cGVyaWVuY2Utc2VsZWN0b3InKSkgcmV0dXJuOwogICAgY29uc3QgZXhwID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3
aW5kb3cubG9jYXRpb24uc2VhcmNoKS5nZXQoJ2V4cCcpOwogICAgaWYgKEVYUEVSSUVOQ0VTLmluY2x1ZGVzKGV4cCkpIHNlbGVj
dEV4cGVyaWVuY2UoZXhwLCB7IGZyb21IaXN0b3J5OiB0cnVlIH0pOwogICAgZWxzZSByZXNldEV4cGVyaWVuY2UoeyBmcm9tSGlz
dG9yeTogdHJ1ZSB9KTsKICB9KTsKCiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykgewogICAgZG9jdW1l
bnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGxvYWRSb3V0ZXMpOwogIH0gZWxzZSB7CiAgICBsb2FkUm91
dGVzKCk7CiAgfQp9KSgpOwo=
`.replace(/\s+/g, '');

const PAGES = [
  { lang: 'es', file: 'es/pages/rutas.html' },
  { lang: 'en', file: 'en/pages/rutas.html' },
  { lang: 'por', file: 'por/pages/rutas.html' }
];

const COPY = {
  es: { kicker: 'Elige tu experiencia', bar: 'Experiencia:', change: 'Cambiar experiencia', cta: 'Ver rutas',
    adv: { name: 'Adventure', tag: 'Camino auténtico', text: 'Naturaleza, espíritu peregrino y alojamientos con encanto a un precio ajustado.', b: ['Alojamientos con encanto', 'Traslado de mochilas', 'Mejor relación calidad-precio'] },
    pre: { name: 'Premium', tag: 'Máximo confort', text: 'Hoteles seleccionados, más comodidad y atención personalizada en cada etapa.', b: ['Hoteles seleccionados', 'Traslado de mochilas', 'Atención personalizada'] } },
  en: { kicker: 'Choose your experience', bar: 'Experience:', change: 'Change experience', cta: 'View routes',
    adv: { name: 'Adventure', tag: 'Authentic Camino', text: 'Nature, pilgrim spirit and charming stays at a fair price.', b: ['Charming stays', 'Luggage transfer', 'Best value'] },
    pre: { name: 'Premium', tag: 'Maximum comfort', text: 'Selected hotels, extra comfort and personal attention at every stage.', b: ['Selected hotels', 'Luggage transfer', 'Personal attention'] } },
  por: { kicker: 'Escolha a sua experiência', bar: 'Experiência:', change: 'Mudar experiência', cta: 'Ver rotas',
    adv: { name: 'Adventure', tag: 'Caminho autêntico', text: 'Natureza, espírito de peregrino e alojamentos com charme a um preço justo.', b: ['Alojamentos com charme', 'Transporte de mochilas', 'Melhor relação qualidade-preço'] },
    pre: { name: 'Premium', tag: 'Máximo conforto', text: 'Hotéis selecionados, mais conforto e atendimento personalizado em cada etapa.', b: ['Hotéis selecionados', 'Transporte de mochilas', 'Atendimento personalizado'] } }
};

const IMG = { adventure: '/assets/miniatura-frances.webp', premium: '/assets/rutas_banner.webp' };

// Mobile-first. Header = 6rem (h-24). Selector = 100svh - header.
const HEAD = `<script>if(!/[?&]exp=(adventure|premium)(&|$)/.test(location.search))document.documentElement.classList.add('exp-select-mode');</script>
  <style data-exp-v2-css>
    html.exp-select-mode body section:not(#experience-selector),
    html.exp-select-mode sts-footer{display:none!important}
    #experience-selector{position:relative;display:flex;flex-direction:column;width:100%;
      height:calc(100vh - 6rem);height:calc(100svh - 6rem);min-height:30rem;background:#0b0b0b;overflow:hidden}
    .exp-pill{position:absolute;top:.75rem;left:50%;transform:translateX(-50%);z-index:5;pointer-events:none;
      padding:.4rem 1rem;border-radius:999px;background:rgba(255,255,255,.92);color:#111;font-size:.7rem;font-weight:700;
      letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,.25)}
    .exp-panel{position:relative;flex:1 1 0;min-height:0;width:100%;display:block;padding:0;border:0;margin:0;overflow:hidden;
      cursor:pointer;text-align:left;color:#fff;background:#111;-webkit-tap-highlight-color:transparent;
      transition:flex-grow .7s cubic-bezier(.22,1,.36,1)}
    .exp-panel+.exp-panel{border-top:2px solid rgba(255,255,255,.85)}
    .exp-panel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
      transition:transform 1.2s cubic-bezier(.22,1,.36,1),filter .6s ease}
    .exp-overlay{position:absolute;inset:0}
    .exp-adventure .exp-overlay{background:linear-gradient(to top,rgba(8,50,28,.92) 5%,rgba(0,0,0,.2) 75%)}
    .exp-premium .exp-overlay{background:linear-gradient(to top,rgba(66,42,8,.92) 5%,rgba(0,0,0,.2) 75%)}
    .exp-content{position:absolute;left:0;right:0;bottom:0;display:block;padding:1rem 1.25rem 1.25rem;
      animation:expRise .8s cubic-bezier(.22,1,.36,1) both}
    .exp-tag{display:inline-block;margin-bottom:.4rem;padding:.25rem .7rem;border-radius:999px;background:rgba(255,255,255,.18);
      backdrop-filter:blur(4px);font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
    .exp-title{display:block;margin-bottom:.35rem;font-size:clamp(1.75rem,8vw,2.5rem);font-weight:700;line-height:1.05;
      font-family:var(--font-family-heading)}
    .exp-text{display:block;max-width:28rem;margin-bottom:.7rem;font-size:.9rem;line-height:1.4;color:#e5e7eb}
    .exp-list{display:none;list-style:none;margin:0 0 1rem;padding:0}
    .exp-list li{margin-bottom:.3rem;font-size:.95rem}
    .exp-list i{margin-right:.4rem;color:#fbbf24}
    .exp-cta{display:inline-flex;align-items:center;gap:.5rem;padding:.65rem 1.2rem;border-radius:.6rem;background:#fff;color:#111;
      font-size:.9rem;font-weight:700;transition:gap .3s ease}
    .exp-panel:active{filter:brightness(.92)}
    @media(min-width:480px) and (min-height:640px){.exp-text{font-size:1rem}.exp-list{display:block}}
    @media(min-width:768px){
      #experience-selector{flex-direction:row;min-height:34rem}
      .exp-pill{top:1.5rem;font-size:.8rem;padding:.5rem 1.4rem}
      .exp-panel+.exp-panel{border-top:0;border-left:2px solid rgba(255,255,255,.85)}
      .exp-content{padding:2.5rem 2.5rem 3rem}
      .exp-title{font-size:clamp(2.5rem,5vw,4.5rem)}
      .exp-text{font-size:1.05rem}
      .exp-list{display:block}
    }
    @media(min-width:768px) and (hover:hover){
      .exp-text,.exp-list,.exp-cta{opacity:0;transform:translateY(14px);transition:opacity .5s ease,transform .5s ease}
      .exp-panel:hover .exp-text,.exp-panel:focus-visible .exp-text,
      .exp-panel:hover .exp-list,.exp-panel:focus-visible .exp-list,
      .exp-panel:hover .exp-cta,.exp-panel:focus-visible .exp-cta{opacity:1;transform:none}
      #experience-selector:hover .exp-panel{flex-grow:.7}
      #experience-selector .exp-panel:hover,#experience-selector .exp-panel:focus-visible{flex-grow:1.6}
      .exp-panel:hover img,.exp-panel:focus-visible img{transform:scale(1.08)}
      #experience-selector:hover .exp-panel:not(:hover) img{filter:grayscale(.6) brightness(.7)}
      .exp-panel:hover .exp-cta{gap:1rem}
    }
    @keyframes expRise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
    @media(prefers-reduced-motion:reduce){.exp-panel,.exp-panel img,.exp-content,.exp-text,.exp-list,.exp-cta{transition:none!important;animation:none!important}}
  </style>
`;

function panel(kind, c, cta) {
  const items = c.b.map(x => `<li><i class="fa-solid fa-check" aria-hidden="true"></i>${x}</li>`).join('');
  return `<button type="button" class="exp-panel exp-${kind}" onclick="stsSelectExperience('${kind}')" aria-label="${c.name}">
      <img src="${IMG[kind]}" alt="" loading="${kind === 'adventure' ? 'eager' : 'lazy'}" decoding="async">
      <span class="exp-overlay"></span>
      <span class="exp-content">
        <span class="exp-tag">${c.tag}</span>
        <span class="exp-title">${c.name}</span>
        <span class="exp-text">${c.text}</span>
        <ul class="exp-list">${items}</ul>
        <span class="exp-cta">${cta} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
      </span>
    </button>`;
}

function selectorHTML(lang) {
  const c = COPY[lang];
  return `<!-- ===== SELECTOR DE EXPERIENCIA (v2) ===== -->
  <section id="experience-selector" ${MARK} aria-label="${c.kicker}">
    <span class="exp-pill">${c.kicker}</span>
    ${panel('adventure', c.adv, c.cta)}
    ${panel('premium', c.pre, c.cta)}
  </section>
  <div id="routes-list-wrapper" style="display:none">
    <div class="bg-white border-b border-[var(--light-border-color)]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
        <span class="text-[var(--gray-text-color)] text-sm">${c.bar} <strong class="text-[var(--dark-text-color)]" data-exp-label></strong></span>
        <button type="button" onclick="stsResetExperience()" class="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 hover:bg-gray-200 transition-all"><i class="fa-solid fa-arrow-left"></i> ${c.change}</button>
      </div>
    </div>
  `;
}

function patchHtml(html, lang) {
  if (html.includes(MARK)) return { html, status: 'ya aplicado' };
  if (html.includes(OLD_MARK)) return { html, status: 'ERROR: versión anterior aplicada' };
  const gridIdx = html.indexOf('id="routes-grid"');
  const headEnd = html.indexOf('</head>');
  if (gridIdx < 0 || headEnd < 0) return { html, status: 'estructura inesperada (omitido)' };
  const endTag = html.indexOf('</section>', gridIdx);
  if (endTag < 0) return { html, status: 'estructura inesperada (omitido)' };
  const end = endTag + '</section>'.length;
  const fi = html.search(/filter-btn|filterRoutes\(/);
  const anchor = fi >= 0 && fi < gridIdx ? fi : gridIdx;
  const start = html.lastIndexOf('<section', anchor);
  if (start < 0) return { html, status: 'estructura inesperada (omitido)' };
  const cut = html.lastIndexOf('<!--', start);
  const s = cut >= 0 && html.slice(cut, start).split('\n').length <= 2 ? cut : start;
  const body = html.slice(0, s) + selectorHTML(lang) + '  ' + html.slice(s, end) + '\n  </div>' + html.slice(end);
  const he = body.indexOf('</head>');
  return { html: body.slice(0, he) + '  ' + HEAD + body.slice(he), status: 'modificado' };
}

const ts = () => new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
function listBackups() {
  if (!fs.existsSync(BACKUP_ROOT)) return [];
  return fs.readdirSync(BACKUP_ROOT).filter(d => fs.existsSync(path.join(BACKUP_ROOT, d, 'manifest.json'))).sort();
}

function restore() {
  const i = args.indexOf('--restore');
  const wanted = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : null;
  const all = listBackups();
  const name = wanted || all[all.length - 1];
  if (!name || !all.includes(name)) { console.error('No hay backup' + (wanted ? ` "${wanted}"` : '') + '. Usa --list.'); process.exit(1); }
  const dir = path.join(BACKUP_ROOT, name);
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  for (const f of manifest.files) { fs.copyFileSync(path.join(dir, 'files', f), path.join(ROOT, f)); console.log('  restaurado', f); }
  console.log(`\nRestaurado desde ${name}. Cambios revertidos.`);
}

function apply() {
  if (!fs.existsSync(path.join(ROOT, RC_PATH)) || !fs.existsSync(path.join(ROOT, 'es/pages/rutas.html'))) {
    console.error('Ejecuta este script desde la raíz del repo AGENCIA1 (no encuentro es/pages/rutas.html).'); process.exit(1);
  }
  const curRc = fs.readFileSync(path.join(ROOT, RC_PATH), 'utf8');
  if (!curRc.includes(RC_MARK) && curRc.includes('stsSelectExperience')) {
    console.error('Tienes aplicada la versión anterior. Primero ejecuta:\n  node aplicar-experiencias.js --restore\ny luego vuelve a lanzar este script.'); process.exit(1);
  }
  const rc = Buffer.from(ROUTE_CARDS_B64, 'base64').toString('utf8');
  const changes = [{ file: RC_PATH, content: rc, status: curRc === rc ? 'ya aplicado' : 'modificado' }];
  for (const p of PAGES) {
    const full = path.join(ROOT, p.file);
    if (!fs.existsSync(full)) { console.log(`  - ${p.file}: no existe (omitido)`); continue; }
    const r = patchHtml(fs.readFileSync(full, 'utf8'), p.lang);
    changes.push({ file: p.file, content: r.html, status: r.status });
  }
  changes.forEach(c => console.log(`  - ${c.file}: ${c.status}`));
  if (changes.some(c => c.status.startsWith('ERROR'))) {
    console.error('\nAbortado: hay restos de la versión anterior. Ejecuta primero: node aplicar-experiencias.js --restore'); process.exit(1);
  }
  const todo = changes.filter(c => c.status === 'modificado');
  if (DRY) { console.log('\n(dry-run) No se ha escrito nada.'); return; }
  if (!todo.length) { console.log('\nNada que cambiar.'); return; }

  const name = ts();
  const dir = path.join(BACKUP_ROOT, name);
  for (const c of todo) {
    const dest = path.join(dir, 'files', c.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(ROOT, c.file), dest);
  }
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({ version: 2, created: new Date().toISOString(), files: todo.map(c => c.file) }, null, 2));
  for (const c of todo) fs.writeFileSync(path.join(ROOT, c.file), c.content, 'utf8');
  const gi = path.join(ROOT, '.gitignore');
  if (fs.existsSync(gi) && !fs.readFileSync(gi, 'utf8').includes('.backup-experiencias')) fs.appendFileSync(gi, '\n.backup-experiencias/\n');

  console.log(`\nListo. Backup en .backup-experiencias/${name}`);
  console.log('Volver atrás:  node aplicar-experiencias-v2.js --restore');
  console.log('Precios por experiencia: PRICE_OVERRIDES en scripts/components/routeCards.js');
}

if (args.includes('--list')) { const b = listBackups(); console.log(b.length ? b.join('\n') : 'Sin backups.'); }
else if (args.includes('--restore')) restore();
else apply();
