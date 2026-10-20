/**
 * Selector Adventure / Premium en "Todas las rutas"
 *
 * Uso (desde la raíz del repo AGENCIA1):
 *   node aplicar-experiencias.js              -> aplica cambios (con backup automático)
 *   node aplicar-experiencias.js --dry-run    -> muestra qué haría, sin escribir
 *   node aplicar-experiencias.js --restore    -> vuelve atrás con el último backup
 *   node aplicar-experiencias.js --restore 2026-10-19T12-00-00   -> backup concreto
 *   node aplicar-experiencias.js --list       -> lista backups
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BACKUP_ROOT = path.join(ROOT, '.backup-experiencias');
const MARK = 'data-exp-selector';
const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');

const ROUTE_CARDS_B64 = `
KGZ1bmN0aW9uICgpIHsKICBjb25zdCBnZXRMYW5nRnJvbVBhdGggPSAocGF0aCkgPT4gewogICAgY29uc3QgcCA9IHBhdGgudG9M
b3dlckNhc2UoKTsKICAgIGlmIChwLmluY2x1ZGVzKCcvZW4vJykgfHwgcC5lbmRzV2l0aCgnL2VuJykpIHJldHVybiAnZW4nOwog
ICAgaWYgKHAuaW5jbHVkZXMoJy9wb3IvJykgfHwgcC5pbmNsdWRlcygnL3B0LycpIHx8IHAuZW5kc1dpdGgoJy9wb3InKSB8fCBw
LmVuZHNXaXRoKCcvcHQnKSkgcmV0dXJuICdwb3InOwogICAgcmV0dXJuICdlcyc7CiAgfTsKCiAgY29uc3QgbGFiZWxzID0gewog
ICAgZXM6IHsgbG9hZGluZzogIkNhcmdhbmRvIHJ1dGFzLi4uIiwgZXJyb3I6ICJObyBzZSBwdWRpZXJvbiBjYXJnYXIgbGFzIHJ1
dGFzIiwgcmV0cnk6ICJSZWludGVudGFyIiwgZnJvbTogIkRlc2RlIiwgZGV0YWlsczogIlZlciBkZXRhbGxlcyDihpIiLCBhZHZl
bnR1cmU6ICJBZHZlbnR1cmUiLCBwcmVtaXVtOiAiUHJlbWl1bSIgfSwKICAgIGVuOiB7IGxvYWRpbmc6ICJMb2FkaW5nIHJvdXRl
cy4uLiIsIGVycm9yOiAiQ291bGQgbm90IGxvYWQgcm91dGVzIiwgcmV0cnk6ICJSZXRyeSIsIGZyb206ICJGcm9tIiwgZGV0YWls
czogIlZpZXcgZGV0YWlscyDihpIiLCBhZHZlbnR1cmU6ICJBZHZlbnR1cmUiLCBwcmVtaXVtOiAiUHJlbWl1bSIgfSwKICAgIHBv
cjogeyBsb2FkaW5nOiAiQ2FycmVnYW5kbyByb3Rhcy4uLiIsIGVycm9yOiAiTsOjbyBmb2kgcG9zc8OtdmVsIGNhcnJlZ2FyIGFz
IHJvdGFzIiwgcmV0cnk6ICJSZXBldGlyIiwgZnJvbTogIkEgcGFydGlyIGRlIiwgZGV0YWlsczogIlZlciBkZXRhbGhlcyDihpIi
LCBhZHZlbnR1cmU6ICJBZHZlbnR1cmUiLCBwcmVtaXVtOiAiUHJlbWl1bSIgfQogIH07CgogIC8vIOKcj++4jyBQUkVDSU9TIFBP
UiBFWFBFUklFTkNJQSAoZWRpdGFyIGFxdcOtIGEgcG9zdGVyaW9yaSkKICAvLyBTaSB1bmEgcnV0YSBubyBhcGFyZWNlLCB1c2Eg
ZWwgcHJlY2lvIGJhc2UgZGUgcnV0YXMuanNvbi4KICAvLyBFamVtcGxvOiBQUklDRV9PVkVSUklERVMucHJlbWl1bVsnZnJhbmNl
cyddID0gJzUyMCDigqwvcGVyc29uYSc7CiAgY29uc3QgUFJJQ0VfT1ZFUlJJREVTID0gewogICAgYWR2ZW50dXJlOiB7fSwKICAg
IHByZW1pdW06IHt9CiAgfTsKICBjb25zdCBFWFBFUklFTkNFUyA9IFsnYWR2ZW50dXJlJywgJ3ByZW1pdW0nXTsKCiAgbGV0IGFs
bFJvdXRlcyA9IG51bGw7CiAgbGV0IGN1cnJlbnRFeHAgPSBudWxsOwogIGNvbnN0IGxhbmcgPSBnZXRMYW5nRnJvbVBhdGgod2lu
ZG93LmxvY2F0aW9uLnBhdGhuYW1lKTsKICBjb25zdCB0ID0gbGFiZWxzW2xhbmddIHx8IGxhYmVscy5lczsKCiAgZnVuY3Rpb24g
Y3JlYXRlUm91dGVDYXJkKHJ1dGEsIGV4cCkgewogICAgY29uc3QgdGFnc0hUTUwgPSBydXRhLnRhZ3MKICAgICAgLm1hcCh0YWcg
PT4gYAogICAgICAgIDxzcGFuIGNsYXNzPSJiZy1bdmFyKC0tcHJpbWFyeS1jb2xvcildLzEwIHRleHQtW3ZhcigtLXByaW1hcnkt
Y29sb3IpXSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHB4LTMgcHktMSByb3VuZGVkLWZ1bGwiPgogICAgICAgICAgJHt0YWd9CiAgICAg
ICAgPC9zcGFuPmApCiAgICAgIC5qb2luKCcnKTsKICAgIGNvbnN0IHByaWNlID0gKGV4cCAmJiBQUklDRV9PVkVSUklERVNbZXhw
XSAmJiBQUklDRV9PVkVSUklERVNbZXhwXVtydXRhLmlkXSkgfHwgcnV0YS5wcmVjaW87CiAgICBjb25zdCBleHBQYXJhbSA9IGV4
cCA/IGAmZXhwPSR7ZXhwfWAgOiAnJzsKICAgIGNvbnN0IGV4cEJhZGdlID0gZXhwCiAgICAgID8gYDxkaXYgY2xhc3M9ImFic29s
dXRlIHRvcC00IHJpZ2h0LTQiPjxzcGFuIGNsYXNzPSIke2V4cCA9PT0gJ3ByZW1pdW0nID8gJ2JnLWFtYmVyLTUwMCB0ZXh0LXdo
aXRlJyA6ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlJ30gdGV4dC14cyBmb250LWJvbGQgcHgtMyBweS0xIHJvdW5kZWQtZnVs
bCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZSI+JHt0W2V4cF19PC9zcGFuPjwvZGl2PmAKICAgICAgOiAnJzsKCiAgICByZXR1cm4g
YAogICAgICA8ZGl2IGNsYXNzPSJyb3V0ZS1jYXJkIGJnLXdoaXRlIHJvdW5kZWQtMnhsIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ct
bGcgaG92ZXI6c2hhZG93LTJ4bCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgZ3JvdXAgdHJhbnNmb3JtIGhvdmVyOi10cmFu
c2xhdGUteS0xIgogICAgICAgICAgIGRhdGEtZGlmZmljdWx0eT0iJHtydXRhLmRpZmljdWx0YWR9IiBkYXRhLWV4cGVyaWVuY2U9
IiR7ZXhwIHx8ICcnfSI+CiAgICAgICAgPGRpdiBjbGFzcz0icmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGgtNTYiPgogICAgICAg
ICAgPGltZyBzcmM9IiR7cnV0YS5pbWFnZW59IiBhbHQ9IiR7cnV0YS5ub21icmV9IiBjbGFzcz0idy1mdWxsIGgtZnVsbCBvYmpl
Y3QtY292ZXIgZ3JvdXAtaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTUwMCIgbG9hZGluZz0i
bGF6eSI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1ibGFjay82
MCB0by10cmFuc3BhcmVudCI+PC9kaXY+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJhYnNvbHV0ZSB0b3AtNCBsZWZ0LTQiPgogICAg
ICAgICAgICA8c3BhbiBjbGFzcz0iJHtydXRhLmJhZGdlQ29sb3J9IHRleHQteHMgZm9udC1ib2xkIHB4LTMgcHktMSByb3VuZGVk
LWZ1bGwiPiR7cnV0YS5iYWRnZX08L3NwYW4+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICR7ZXhwQmFkZ2V9CiAgICAgICAg
ICA8ZGl2IGNsYXNzPSJhYnNvbHV0ZSBib3R0b20tNCBsZWZ0LTQiPgogICAgICAgICAgICA8c3BhbiBjbGFzcz0iJHtydXRhLmRp
ZmljdWx0YWRDb2xvcn0gdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtYm9sZCBweC0zIHB5LTEgcm91bmRlZC1mdWxsIHVwcGVyY2Fz
ZSB0cmFja2luZy13aWRlIj4ke3J1dGEuZGlmaWN1bHRhZExhYmVsfTwvc3Bhbj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAg
PGRpdiBjbGFzcz0iYWJzb2x1dGUgYm90dG9tLTQgcmlnaHQtNCB0ZXh0LXdoaXRlIHRleHQtcmlnaHQiPgogICAgICAgICAgICA8
ZGl2IGNsYXNzPSJ0ZXh0LTJ4bCBmb250LWJvbGQiPiR7cnV0YS5rbX08L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0idGV4
dC14cyBvcGFjaXR5LTgwIj4ke3J1dGEuZGlhc308L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAg
IDxkaXYgY2xhc3M9InAtNiI+CiAgICAgICAgICA8aDMgY2xhc3M9InRleHQteGwgZm9udC1ib2xkIHRleHQtW3ZhcigtLWRhcmst
dGV4dC1jb2xvcildIG1iLTIiIHN0eWxlPSJmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktaGVhZGluZyk7Ij4ke3J1dGEu
bm9tYnJlfTwvaDM+CiAgICAgICAgICA8cCBjbGFzcz0idGV4dC1bdmFyKC0tZ3JheS10ZXh0LWNvbG9yKV0gdGV4dC1zbSBsZWFk
aW5nLXJlbGF4ZWQgbWItNCI+JHtydXRhLmRlc2NyaXBjaW9ufTwvcD4KICAgICAgICAgIDxkaXYgY2xhc3M9ImZsZXggZmxleC13
cmFwIGdhcC0zIG1iLTUgdGV4dC14cyB0ZXh0LVt2YXIoLS1ncmF5LXRleHQtY29sb3IpXSI+CiAgICAgICAgICAgIDxzcGFuIGNs
YXNzPSJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSI+PGkgY2xhc3M9ImZhLXNvbGlkIGZhLW1hcC1waW4gdGV4dC1bdmFyKC0tcHJp
bWFyeS1jb2xvcildIj48L2k+JHtydXRhLmluaWNpb308L3NwYW4+CiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJmbGV4IGl0ZW1z
LWNlbnRlciBnYXAtMSI+PGkgY2xhc3M9ImZhLXNvbGlkIGZhLWZsYWctY2hlY2tlcmVkIHRleHQtW3ZhcigtLXByaW1hcnktY29s
b3IpXSI+PC9pPiR7cnV0YS5maW59PC9zcGFuPgogICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJmbGV4IGZs
ZXgtd3JhcCBnYXAtMiBtYi01Ij4ke3RhZ3NIVE1MfTwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0iZmxleCBpdGVtcy1jZW50
ZXIganVzdGlmeS1iZXR3ZWVuIHB0LTQgYm9yZGVyLXQgYm9yZGVyLWdyYXktMTAwIj4KICAgICAgICAgICAgPGRpdj4KICAgICAg
ICAgICAgICA8c3BhbiBjbGFzcz0idGV4dC1bdmFyKC0tZ3JheS10ZXh0LWNvbG9yKV0gdGV4dC14cyI+JHt0LmZyb219PC9zcGFu
PgogICAgICAgICAgICAgIDxkaXYgY2xhc3M9InRleHQtW3ZhcigtLXByaW1hcnktY29sb3IpXSBmb250LWJvbGQgdGV4dC1sZyI+
JHtwcmljZX08L2Rpdj4KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgIDxhIGhyZWY9Ii8ke2xhbmd9L3BhZ2VzL3J1dGEu
aHRtbD9pZD0ke3J1dGEuaWR9JHtleHBQYXJhbX0iIGNsYXNzPSJweC01IHB5LTIuNSBiZy1bdmFyKC0tcHJpbWFyeS1jb2xvcild
IHRleHQtd2hpdGUgdGV4dC1zbSBmb250LXNlbWlib2xkIHJvdW5kZWQtbGcgaG92ZXI6YmctW3ZhcigtLXByaW1hcnktYnV0dG9u
LWhvdmVyLWJnLWNvbG9yKV0gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIHNoYWRvdy1tZCI+CiAgICAgICAgICAgICAgJHt0
LmRldGFpbHN9CiAgICAgICAgICAgIDwvYT4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAg
IGA7CiAgfQoKICBmdW5jdGlvbiByZW5kZXJHcmlkKGV4cCkgewogICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRC
eUlkKCdyb3V0ZXMtZ3JpZCcpOwogICAgaWYgKCFncmlkIHx8ICFhbGxSb3V0ZXMpIHJldHVybjsKICAgIGdyaWQuaW5uZXJIVE1M
ID0gYWxsUm91dGVzLm1hcChyID0+IGNyZWF0ZVJvdXRlQ2FyZChyLCBleHApKS5qb2luKCcnKTsKICAgIGRvY3VtZW50LmRpc3Bh
dGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdyb3V0ZXNMb2FkZWQnLCB7IGRldGFpbDogeyB0b3RhbDogYWxsUm91dGVzLmxlbmd0
aCwgZXhwZXJpZW5jZTogZXhwIH0gfSkpOwogIH0KCiAgZnVuY3Rpb24gc2V0VXJsRXhwKGV4cCkgewogICAgdHJ5IHsKICAgICAg
Y29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7CiAgICAgIGlmIChleHApIHVybC5zZWFyY2hQYXJhbXMu
c2V0KCdleHAnLCBleHApOyBlbHNlIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKCdleHAnKTsKICAgICAgaGlzdG9yeS5yZXBsYWNl
U3RhdGUobnVsbCwgJycsIHVybC50b1N0cmluZygpKTsKICAgIH0gY2F0Y2ggKGUpIHt9CiAgfQoKICBmdW5jdGlvbiBzZWxlY3RF
eHBlcmllbmNlKGV4cCkgewogICAgaWYgKCFFWFBFUklFTkNFUy5pbmNsdWRlcyhleHApKSByZXR1cm47CiAgICBjdXJyZW50RXhw
ID0gZXhwOwogICAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhwZXJpZW5jZS1zZWxlY3Rvcicp
OwogICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3V0ZXMtbGlzdC13cmFwcGVyJyk7CiAgICBp
ZiAoc2VsZWN0b3IpIHNlbGVjdG9yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICBpZiAod3JhcHBlcikgd3JhcHBlci5zdHls
ZS5kaXNwbGF5ID0gJyc7CiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1leHAtbGFiZWxdJykuZm9yRWFjaChl
bCA9PiB7IGVsLnRleHRDb250ZW50ID0gdFtleHBdOyB9KTsKICAgIHJlbmRlckdyaWQoZXhwKTsKICAgIHNldFVybEV4cChleHAp
OwogICAgaWYgKHdyYXBwZXIpIHdyYXBwZXIuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnc3Rh
cnQnIH0pOwogIH0KCiAgZnVuY3Rpb24gcmVzZXRFeHBlcmllbmNlKCkgewogICAgY3VycmVudEV4cCA9IG51bGw7CiAgICBjb25z
dCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHBlcmllbmNlLXNlbGVjdG9yJyk7CiAgICBjb25zdCB3cmFw
cGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdXRlcy1saXN0LXdyYXBwZXInKTsKICAgIGlmICh3cmFwcGVyKSB3cmFw
cGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICBpZiAoc2VsZWN0b3IpIHsKICAgICAgc2VsZWN0b3Iuc3R5bGUuZGlzcGxh
eSA9ICcnOwogICAgICBzZWxlY3Rvci5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdzdGFydCcg
fSk7CiAgICB9CiAgICBzZXRVcmxFeHAobnVsbCk7CiAgfQoKICBhc3luYyBmdW5jdGlvbiBsb2FkUm91dGVzKCkgewogICAgY29u
c3QgZ3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3V0ZXMtZ3JpZCcpOwogICAgaWYgKCFncmlkKSByZXR1cm47Cgog
ICAgZ3JpZC5pbm5lckhUTUwgPSBgCiAgICAgIDxkaXYgY2xhc3M9ImNvbC1zcGFuLWZ1bGwgZmxleCBqdXN0aWZ5LWNlbnRlciBp
dGVtcy1jZW50ZXIgcHktMjAiPgogICAgICAgIDxkaXYgY2xhc3M9InRleHQtY2VudGVyIj4KICAgICAgICAgIDxpIGNsYXNzPSJm
YS1zb2xpZCBmYS1yb3V0ZSB0ZXh0LTR4bCB0ZXh0LVt2YXIoLS1wcmltYXJ5LWNvbG9yKV0gYW5pbWF0ZS1wdWxzZSBtYi00IGJs
b2NrIj48L2k+CiAgICAgICAgICA8cCBjbGFzcz0idGV4dC1bdmFyKC0tZ3JheS10ZXh0LWNvbG9yKV0iPiR7dC5sb2FkaW5nfTwv
cD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICBgOwoKICAgIHRyeSB7CiAgICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBb
CiAgICAgICAgYC8ke2xhbmd9L2RhdGEvcnV0YXMuanNvbmAsCiAgICAgICAgYC8ke2xhbmcgPT09ICdlbicgPyAnZW4nIDogKGxh
bmcgPT09ICdwb3InIHx8IGxhbmcgPT09ICdwdCcpID8gJ3BvcicgOiAnZXMnfS9kYXRhL3J1dGFzLmpzb25gLAogICAgICAgIGAv
JHtsYW5nID09PSAnZW4nID8gJ2VuJyA6IChsYW5nID09PSAncG9yJyB8fCBsYW5nID09PSAncHQnKSA/ICdwdCcgOiAnZXMnfS9k
YXRhL3J1dGFzLmpzb25gLAogICAgICAgIGAvZXMvZGF0YS9ydXRhcy5qc29uYAogICAgICBdOwoKICAgICAgbGV0IHJ1dGFzID0g
bnVsbDsKICAgICAgZm9yIChjb25zdCB1cmwgb2YgY2FuZGlkYXRlcykgewogICAgICAgIHRyeSB7CiAgICAgICAgICBjb25zdCBy
ZXMgPSBhd2FpdCBmZXRjaCh1cmwpOwogICAgICAgICAgaWYgKHJlcy5vaykgewogICAgICAgICAgICBydXRhcyA9IGF3YWl0IHJl
cy5qc29uKCk7CiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJ1dGFzKSAmJiBydXRhcy5sZW5ndGggPiAwKSBicmVhazsK
ICAgICAgICAgIH0KICAgICAgICB9IGNhdGNoIChlKSB7fQogICAgICB9CgogICAgICBpZiAoIXJ1dGFzKSB0aHJvdyBuZXcgRXJy
b3IoJ05vIHNlIHB1ZG8gY2FyZ2FyIHJ1dGFzLmpzb24gZGVzZGUgbmluZ3VuYSBydXRhJyk7CiAgICAgIGFsbFJvdXRlcyA9IHJ1
dGFzOwoKICAgICAgY29uc3QgaGFzU2VsZWN0b3IgPSAhIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleHBlcmllbmNlLXNlbGVj
dG9yJyk7CiAgICAgIGlmICghaGFzU2VsZWN0b3IpIHsKICAgICAgICByZW5kZXJHcmlkKG51bGwpOwogICAgICAgIHJldHVybjsK
ICAgICAgfQogICAgICBjb25zdCB3YW50ZWQgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLmdl
dCgnZXhwJyk7CiAgICAgIGlmIChFWFBFUklFTkNFUy5pbmNsdWRlcyh3YW50ZWQpKSBzZWxlY3RFeHBlcmllbmNlKHdhbnRlZCk7
CiAgICB9IGNhdGNoIChlcnJvcikgewogICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjYXJnYW5kbyBydXRhczonLCBlcnJvcik7
CiAgICAgIGdyaWQuaW5uZXJIVE1MID0gYAogICAgICAgIDxkaXYgY2xhc3M9ImNvbC1zcGFuLWZ1bGwgdGV4dC1jZW50ZXIgcHkt
MTYiPgogICAgICAgICAgPGkgY2xhc3M9ImZhLXNvbGlkIGZhLXRyaWFuZ2xlLWV4Y2xhbWF0aW9uIHRleHQtNHhsIHRleHQtcmVk
LTQwMCBtYi00IGJsb2NrIj48L2k+CiAgICAgICAgICA8cCBjbGFzcz0idGV4dC1bdmFyKC0tZ3JheS10ZXh0LWNvbG9yKV0gdGV4
dC1sZyBmb250LW1lZGl1bSI+JHt0LmVycm9yfTwvcD4KICAgICAgICAgIDxidXR0b24gb25jbGljaz0ibG9jYXRpb24ucmVsb2Fk
KCkiIGNsYXNzPSJtdC00IHB4LTYgcHktMiBiZy1bdmFyKC0tcHJpbWFyeS1jb2xvcildIHRleHQtd2hpdGUgcm91bmRlZC1sZyB0
ZXh0LXNtIGZvbnQtc2VtaWJvbGQgaG92ZXI6YmctW3ZhcigtLXByaW1hcnktYnV0dG9uLWhvdmVyLWJnLWNvbG9yKV0gdHJhbnNp
dGlvbi1hbGwiPiR7dC5yZXRyeX08L2J1dHRvbj4KICAgICAgICA8L2Rpdj4KICAgICAgYDsKICAgIH0KICB9CgogIHdpbmRvdy5z
dHNTZWxlY3RFeHBlcmllbmNlID0gZnVuY3Rpb24gKGV4cCkgewogICAgaWYgKGFsbFJvdXRlcykgc2VsZWN0RXhwZXJpZW5jZShl
eHApOwogICAgZWxzZSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyb3V0ZXNMb2FkZWQnLCAoKSA9PiBzZWxlY3RFeHBlcmll
bmNlKGV4cCksIHsgb25jZTogdHJ1ZSB9KTsKICB9OwogIHdpbmRvdy5zdHNSZXNldEV4cGVyaWVuY2UgPSByZXNldEV4cGVyaWVu
Y2U7CgogIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHsKICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVu
ZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBsb2FkUm91dGVzKTsKICB9IGVsc2UgewogICAgbG9hZFJvdXRlcygpOwogIH0KfSkoKTsK
`.replace(/\s+/g, '');

const PAGES = [
  { lang: 'es', file: 'es/rutas/index.html' },
  { lang: 'en', file: 'en/routes/index.html' },
  { lang: 'pt', file: 'pt/rotas/index.html' }
];

const COPY = {
  es: {
    kicker: 'Elige tu experiencia', title: '¿Cómo quieres vivir el Camino?',
    adv: { name: 'Adventure', tag: 'Camino auténtico', text: 'Naturaleza, espíritu peregrino y alojamientos con encanto a un precio ajustado.', b: ['Alojamientos con encanto', 'Traslado de mochilas', 'Mejor relación calidad-precio'] },
    pre: { name: 'Premium', tag: 'Máximo confort', text: 'Hoteles seleccionados, más comodidad y atención personalizada en cada etapa.', b: ['Hoteles seleccionados', 'Traslado de mochilas', 'Atención personalizada'] },
    cta: 'Ver rutas', bar: 'Experiencia:', change: 'Cambiar experiencia'
  },
  en: {
    kicker: 'Choose your experience', title: 'How do you want to live the Camino?',
    adv: { name: 'Adventure', tag: 'Authentic Camino', text: 'Nature, pilgrim spirit and charming stays at a fair price.', b: ['Charming stays', 'Luggage transfer', 'Best value'] },
    pre: { name: 'Premium', tag: 'Maximum comfort', text: 'Selected hotels, extra comfort and personal attention at every stage.', b: ['Selected hotels', 'Luggage transfer', 'Personal attention'] },
    cta: 'View routes', bar: 'Experience:', change: 'Change experience'
  },
  pt: {
    kicker: 'Escolha a sua experiência', title: 'Como quer viver o Caminho?',
    adv: { name: 'Adventure', tag: 'Caminho autêntico', text: 'Natureza, espírito de peregrino e alojamentos com charme a um preço justo.', b: ['Alojamentos com charme', 'Transporte de mochilas', 'Melhor relação qualidade-preço'] },
    pre: { name: 'Premium', tag: 'Máximo conforto', text: 'Hotéis selecionados, mais conforto e atendimento personalizado em cada etapa.', b: ['Hotéis selecionados', 'Transporte de mochilas', 'Atendimento personalizado'] },
    cta: 'Ver rotas', bar: 'Experiência:', change: 'Mudar experiência'
  }
};

const STYLE = `<style>
  .exp-split{display:flex;flex-direction:column}
  @media(min-width:768px){.exp-split{flex-direction:row;height:75vh;min-height:520px}}
  .exp-panel{position:relative;flex:1;min-height:340px;overflow:hidden;cursor:pointer;border:0;padding:0;text-align:left;color:#fff;background:#111;transition:flex .7s cubic-bezier(.22,1,.36,1)}
  .exp-panel+.exp-panel{border-top:2px solid rgba(255,255,255,.7)}
  @media(min-width:768px){.exp-panel+.exp-panel{border-top:0;border-left:2px solid rgba(255,255,255,.7)}}
  .exp-panel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s ease,filter .6s ease}
  .exp-overlay{position:absolute;inset:0;transition:opacity .6s ease}
  .exp-adventure .exp-overlay{background:linear-gradient(to top,rgba(10,55,30,.92),rgba(0,0,0,.25))}
  .exp-premium .exp-overlay{background:linear-gradient(to top,rgba(70,45,10,.92),rgba(0,0,0,.25))}
  .exp-content{position:absolute;left:0;right:0;bottom:0;padding:2rem 2rem 2.5rem}
  .exp-tag{display:inline-block;font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.3rem .8rem;border-radius:999px;background:rgba(255,255,255,.18);backdrop-filter:blur(4px);margin-bottom:.8rem}
  .exp-title{font-size:2.25rem;font-weight:700;line-height:1.1;margin-bottom:.6rem;font-family:var(--font-family-heading)}
  @media(min-width:1024px){.exp-title{font-size:3rem}}
  .exp-extra{max-height:0;opacity:0;overflow:hidden;transition:max-height .6s ease,opacity .5s ease}
  .exp-extra p{color:#e5e7eb;margin-bottom:.8rem;max-width:30rem}
  .exp-extra ul{list-style:none;padding:0;margin:0 0 1.2rem}
  .exp-extra li{font-size:.9rem;margin-bottom:.3rem}
  .exp-cta{display:inline-flex;align-items:center;gap:.6rem;padding:.75rem 1.5rem;border-radius:.6rem;font-weight:700;background:#fff;color:#111;transition:transform .3s ease,gap .3s ease}
  .exp-panel:hover .exp-cta{gap:1rem}
  @media(hover:hover) and (min-width:768px){
    .exp-split:hover .exp-panel{flex:.75}
    .exp-split .exp-panel:hover,.exp-split .exp-panel:focus-visible{flex:1.5}
    .exp-panel:hover img,.exp-panel:focus-visible img{transform:scale(1.08)}
    .exp-split:hover .exp-panel:not(:hover) img{filter:grayscale(.6) brightness(.7)}
    .exp-panel:hover .exp-extra,.exp-panel:focus-visible .exp-extra{max-height:300px;opacity:1}
  }
  @media(hover:none),(max-width:767px){.exp-extra{max-height:300px;opacity:1}}
  @media(prefers-reduced-motion:reduce){.exp-panel,.exp-panel img,.exp-extra{transition:none}}
</style>`;

function panel(kind, c, img, exp) {
  const items = c.b.map(x => `<li><i class="fa-solid fa-check"></i> ${x}</li>`).join('');
  return `<button type="button" class="exp-panel exp-${kind}" onclick="stsSelectExperience('${kind}')" aria-label="${c.name}">
        <img src="${img}" alt="${c.name}" loading="lazy">
        <span class="exp-overlay"></span>
        <span class="exp-content">
          <span class="exp-tag">${c.tag}</span>
          <span class="exp-title" style="display:block">${c.name}</span>
          <span class="exp-extra" style="display:block">
            <p>${c.text}</p>
            <ul>${items}</ul>
            <span class="exp-cta">${exp.cta} <i class="fa-solid fa-arrow-right"></i></span>
          </span>
        </span>
      </button>`;
}

function selectorHTML(lang) {
  const c = COPY[lang];
  return `<!-- ===== SELECTOR DE EXPERIENCIA (aplicar-experiencias) ===== -->
  ${STYLE}
  <section id="experience-selector" ${MARK}>
    <div class="text-center py-10 bg-white">
      <p class="text-[var(--accent-color)] font-semibold text-lg mb-2 tracking-wider uppercase">${c.kicker}</p>
      <h2 class="text-3xl md:text-4xl font-bold text-[var(--dark-text-color)]" style="font-family: var(--font-family-heading);">${c.title}</h2>
    </div>
    <div class="exp-split">
      ${panel('adventure', c.adv, '/assets/miniatura-frances.webp', c)}
      ${panel('premium', c.pre, '/assets/rutas_banner.webp', c)}
    </div>
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
  const gridIdx = html.indexOf('id="routes-grid"');
  if (gridIdx < 0) return { html, status: 'sin #routes-grid (omitido)' };
  const endTag = html.indexOf('</section>', gridIdx);
  if (endTag < 0) return { html, status: 'estructura inesperada (omitido)' };
  const end = endTag + '</section>'.length;
  const filterIdx = html.search(/filter-btn|filterRoutes\(/);
  const anchor = filterIdx >= 0 && filterIdx < gridIdx ? filterIdx : gridIdx;
  const start = html.lastIndexOf('<section', anchor);
  if (start < 0) return { html, status: 'estructura inesperada (omitido)' };
  const cut = html.lastIndexOf('<!--', start);
  const realStart = cut >= 0 && html.slice(cut, start).split('\n').length <= 2 ? cut : start;
  const out = html.slice(0, realStart) + selectorHTML(lang) + '  ' + html.slice(realStart, end) + '\n  </div>' + html.slice(end);
  return { html: out, status: 'modificado' };
}

function ts() { return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19); }
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
  for (const f of manifest.files) {
    fs.copyFileSync(path.join(dir, 'files', f), path.join(ROOT, f));
    console.log('  restaurado', f);
  }
  console.log(`\nRestaurado desde ${name}. Cambios revertidos.`);
}

function apply() {
  const rcPath = 'scripts/components/routeCards.js';
  if (!fs.existsSync(path.join(ROOT, rcPath)) || !fs.existsSync(path.join(ROOT, 'es/rutas/index.html'))) {
    console.error('Ejecuta este script desde la raíz del repo AGENCIA1.'); process.exit(1);
  }
  const changes = [];
  const rc = Buffer.from(ROUTE_CARDS_B64, 'base64').toString('utf8');
  const curRc = fs.readFileSync(path.join(ROOT, rcPath), 'utf8');
  changes.push({ file: rcPath, content: rc, status: curRc === rc ? 'ya aplicado' : 'modificado' });

  for (const p of PAGES) {
    const full = path.join(ROOT, p.file);
    if (!fs.existsSync(full)) { console.log(`  - ${p.file}: no existe (omitido)`); continue; }
    const r = patchHtml(fs.readFileSync(full, 'utf8'), p.lang);
    changes.push({ file: p.file, content: r.html, status: r.status });
  }
  const todo = changes.filter(c => c.status === 'modificado');
  changes.forEach(c => console.log(`  - ${c.file}: ${c.status}`));
  if (DRY) { console.log('\n(dry-run) No se ha escrito nada.'); return; }
  if (!todo.length) { console.log('\nNada que cambiar.'); return; }

  const name = ts();
  const dir = path.join(BACKUP_ROOT, name);
  for (const c of todo) {
    const dest = path.join(dir, 'files', c.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(ROOT, c.file), dest);
  }
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({ created: new Date().toISOString(), files: todo.map(c => c.file) }, null, 2));
  for (const c of todo) fs.writeFileSync(path.join(ROOT, c.file), c.content, 'utf8');

  const gi = path.join(ROOT, '.gitignore');
  if (fs.existsSync(gi) && !fs.readFileSync(gi, 'utf8').includes('.backup-experiencias')) fs.appendFileSync(gi, '\n.backup-experiencias/\n');

  console.log(`\nListo. Backup en .backup-experiencias/${name}`);
  console.log(`Para volver atrás:  node aplicar-experiencias.js --restore`);
  console.log('Precios por experiencia: edita PRICE_OVERRIDES en scripts/components/routeCards.js');
}

if (args.includes('--list')) { const b = listBackups(); console.log(b.length ? b.join('\n') : 'Sin backups.'); }
else if (args.includes('--restore')) restore();
else apply();
