# ília events – Protótipo Funcional (GitHub Pages, JavaScript)
Este pacote inclui todas as funcionalidades do MVP mapeadas nos épicos: autenticação/cadastro com opt-in, inscrição automática via `/e/{slug}`, gestão/admin (ativar/desativar + lista de inscritos), página pública, "Meus Eventos", página interna com abas (Informações, Mapa, Cronograma com lembrete/feedback por atividade, Restaurantes, Feedback geral liberado por data), Perfil com alterar senha (simulado), roteamento por hash e persistência em localStorage.

## Publicação
1. Suba todo o conteúdo deste pacote (incluindo `assets/`) para a raiz do seu repositório no GitHub.
2. Em **Settings → Pages**, selecione a branch (ex.: `main`) e a pasta `/root`.
3. Abra a URL do Pages para testar.

## Deep links
- Público (landing): `/#/e/bmw-tech-summit`
- Login: `/#/login?from=bmw-tech-summit`
- Registro: `/#/register?from=bmw-tech-summit`
- Meus eventos: `/#/meus`
- Evento (interna): `/#/evento/evt_bmw/info`
- Perfil: `/#/perfil` • Admin: `/#/admin`

## Observações
- Todas as ações de envio (login, cadastro, lembrete, feedback) são simuladas.
- O admin demo é `admin@ilia.com / admin`.
