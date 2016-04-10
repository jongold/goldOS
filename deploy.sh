ssh fortitude <<'ENDSSH'
  cd goldOS && git pull && npm i && npm run build && npm start
ENDSSH
