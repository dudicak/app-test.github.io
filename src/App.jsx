import React, { useMemo, useState } from "react";

// Protótipo funcional (single-file) com cara de app mobile
// Navegação interna por estado; simula deep link de evento (/e/{slug})
// Tailwind para UI simples e moderna

// Dados mockados
const initialEvents = [
  {
    id: "evt_bmw",
    slug: "bmw-tech-summit",
    name: "BMW Tech Summit – Drive the Future",
    location: "Brasília/DF",
    startDate: "2025-10-25T09:00:00-03:00",
    endDate: "2025-10-27T18:00:00-03:00",
    lat: -15.7942,
    lng: -47.8822,
    description:
      "Evento de tecnologia com trilhas de Cloud, AI e DevOps. Parcerias com restaurantes locais e atrações.",
    partners: [
      { id: "p1", name: "Sushida Asa Sul", type: "Japonesa", discount: "10%", mapsUrl: "https://maps.google.com" },
      { id: "p2", name: "Cantina Brasília", type: "Italiana", discount: "12%", mapsUrl: "https://maps.google.com" },
    ],
    schedule: [
      { id: "s1", title: "Abertura & Keynote", desc: "Visão 2026", start: "2025-10-25T09:00:00-03:00", end: "2025-10-25T10:00:00-03:00", room: "Auditório" },
      { id: "s2", title: "Palestra: Cloud na BMW", desc: "Arquiteturas escaláveis", start: "2025-10-25T14:00:00-03:00", end: "2025-10-25T15:00:00-03:00", room: "Sala 1" },
      { id: "s3", title: "Painel: AI Aplicada", start: "2025-10-25T18:00:00-03:00", end: "2025-10-25T19:00:00-03:00", room: "Auditório" },
    ],
    active: true,
    feedbackGeneralOpensAt: "2025-10-27T18:00:00-03:00",
  },
  {
    id: "evt_agile",
    slug: "agile-days",
    name: "Agile Days – Edição Centro-Oeste",
    location: "Brasília/DF",
    startDate: "2026-03-12T09:00:00-03:00",
    endDate: "2026-03-13T18:00:00-03:00",
    description: "Dojo, talks e painéis de agilidade.",
    partners: [],
    schedule: [
      { id: "a1", title: "Product Discovery em 90'", start: "2026-03-12T10:00:00-03:00", end: "2026-03-12T11:30:00-03:00" },
    ],
    active: false,
    feedbackGeneralOpensAt: "2026-03-13T18:00:00-03:00",
  },
];

// Helpers
const fmtDate = (iso) =>
  new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

function MobileShell({ title, onMenu, children }) {
  return (
    <div className="w-full min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <div className="w-[380px] h-[760px] bg-white shadow-2xl rounded-3xl overflow-hidden border border-zinc-200 flex flex-col">
        <div className="h-14 bg-gradient-to-r from-sky-600 to-blue-700 text-white flex items-center justify-between px-4">
          <button onClick={onMenu} className="rounded-xl px-3 py-1.5 hover:bg-white/10 transition">☰</button>
          <div className="font-semibold text-sm tracking-wide">{title}</div>
          <div className="text-xs opacity-75">ília events</div>
        </div>
        <div className="flex-1 overflow-auto bg-zinc-50">{children}</div>
      </div>
    </div>
  );
}

function Chip({ children, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return (
    <span className={`px-2 py-0.5 text-[11px] rounded-full border ${tones[tone]} inline-flex items-center gap-1`}>
      {children}
    </span>
  );
}

export default function App() {
  const [events, setEvents] = useState(initialEvents);
  const [screen, setScreen] = useState({ name: "welcome" });
  const [currentUser, setCurrentUser] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState({ open: false, eventId: undefined, slotId: undefined });

  const activeEvents = useMemo(() => events.filter((e) => e.active), [events]);

  const Welcome = () => (
    <MobileShell title="Boas-vindas" onMenu={() => {}}>
      <div className="p-6 space-y-5">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white p-6 shadow-lg">
          <div className="text-xs opacity-90">Evento em destaque</div>
            <div className="text-lg font-semibold mt-1">BMW Tech Summit</div>
            <div className="text-sm opacity-90">Brasília/DF — 25 a 27/10</div>
            <div className="mt-4 flex gap-2">
              <button
                className="px-4 py-2 bg-white/95 text-blue-700 rounded-xl hover:bg-white"
                onClick={() => setScreen({ name: "landing", slug: "bmw-tech-summit" })}
              >
                Abrir /e/bmw-tech-summit
              </button>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {activeEvents.map((e) => (
            <div key={e.id} className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold">{e.name}</div>
                  <div className="text-xs text-zinc-600">{e.location}</div>
                </div>
                <Chip tone="green">Ativo</Chip>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {fmtDate(e.startDate)} — {fmtDate(e.endDate)}
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs"
                  onClick={() => setScreen({ name: "landing", slug: e.slug })}
                >
                  Abrir link público
                </button>
                <button
                  className="px-3 py-1.5 rounded-xl bg-zinc-100 text-xs"
                  onClick={() => setScreen({ name: "login", fromSlug: e.slug })}
                >
                  Entrar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );

  const Landing = ({ slug }) => {
    const ev = events.find((e) => e.slug === slug);
    if (!ev)
      return (
        <MobileShell title="Evento">
          <div className="p-6 text-center text-sm">Evento não encontrado.</div>
        </MobileShell>
      );
    if (!ev.active)
      return (
        <MobileShell title="Evento">
          <div className="p-6 text-center text-sm">Este evento está inativo no momento.</div>
        </MobileShell>
      );
    return (
      <MobileShell title="Evento público">
        <div className="p-6 space-y-4">
          <div className="text-base font-semibold">{ev.name}</div>
          <div className="text-sm text-zinc-600">{ev.location}</div>
          <div className="text-xs text-zinc-500">
            {fmtDate(ev.startDate)} — {fmtDate(ev.endDate)}
          </div>
          <p className="text-sm text-zinc-700">{ev.description}</p>
          <div className="flex gap-2 pt-2">
            <button
              className="px-4 py-2 rounded-xl bg-blue-600 text-white"
              onClick={() => setScreen({ name: "login", fromSlug: slug })}
            >
              Entrar
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-zinc-100"
              onClick={() => setScreen({ name: "register", fromSlug: slug })}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </MobileShell>
    );
  };

  const Login = ({ fromSlug }) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    return (
      <MobileShell title="Login" onMenu={() => {}}>
        <div className="p-6 space-y-3">
          <input
            className="w-full px-3 py-2 rounded-xl border"
            placeholder="E-mail corporativo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 rounded-xl border"
            placeholder="Senha"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            className="w-full px-4 py-2 rounded-xl bg-blue-600 text-white"
            onClick={() => {
              const mockUser = {
                id: "u1",
                name: "Maria Eduarda",
                email: email || "eduarda@ilia.com",
                company: "ília",
                phone: "+55 61 9 9999-9999",
                isAdmin: true,
                optinEmail: true,
                enrolledEventIds: [],
              };
              if (fromSlug) {
                const ev = events.find((e) => e.slug === fromSlug && e.active);
                if (ev && !mockUser.enrolledEventIds.includes(ev.id)) {
                  mockUser.enrolledEventIds.push(ev.id);
                }
              }
              setCurrentUser(mockUser);
              setScreen({ name: "myEvents" });
            }}
          >
            Entrar
          </button>
          <button
            className="w-full px-4 py-2 rounded-xl bg-zinc-100"
            onClick={() => setScreen({ name: "register", fromSlug })}
          >
            Cadastrar
          </button>
        </div>
      </MobileShell>
    );
  };

  const Register = ({ fromSlug }) => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      company: "",
      phone: "",
      pass: "",
      optin: true,
    });
    return (
      <MobileShell title="Cadastro">
        <div className="p-6 space-y-3">
          {["name", "email", "company", "phone", "pass"].map((k) => (
            <input
              key={k}
              className="w-full px-3 py-2 rounded-xl border"
              placeholder={
                {
                  name: "Nome completo",
                  email: "E-mail corporativo",
                  company: "Empresa",
                  phone: "Telefone (opcional)",
                  pass: "Senha",
                }[k]
              }
              type={k === "pass" ? "password" : "text"}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          ))}
          <label className="text-xs flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.optin}
              onChange={(e) => setForm({ ...form, optin: e.target.checked })}
            />
            Quero receber notificações por e-mail
          </label>
            <button
              className="w-full px-4 py-2 rounded-xl bg-blue-600 text-white"
              onClick={() => {
                const newUser = {
                  id: "u" + Math.random().toString(36).slice(2, 7),
                  name: form.name || "Convidado",
                  email: form.email || "guest@ilia.com",
                  company: form.company || "ília",
                  phone: form.phone,
                  isAdmin: false,
                  optinEmail: form.optin,
                  enrolledEventIds: [],
                };
                if (fromSlug) {
                  const ev = events.find(
                    (e) => e.slug === fromSlug && e.active
                  );
                  if (ev) newUser.enrolledEventIds.push(ev.id);
                }
                setCurrentUser(newUser);
                setScreen({ name: "myEvents" });
              }}
            >
              Criar conta
            </button>
        </div>
      </MobileShell>
    );
  };

  const MyEvents = () => {
    if (!currentUser) return <Login />;
    const my = events.filter(
      (e) => currentUser.enrolledEventIds.includes(e.id) && e.active
    );
    return (
      <MobileShell title="Meus eventos" onMenu={() => {}}>
        <div className="p-4 space-y-3">
          {my.length === 0 ? (
            <div className="text-center text-sm text-zinc-600">
              Você ainda não está inscrito em eventos ativos.
            </div>
          ) : (
            my.map((e) => (
              <div
                key={e.id}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div className="text-sm font-semibold">{e.name}</div>
                <div className="text-xs text-zinc-600">{e.location}</div>
                <div className="text-xs text-zinc-500 mt-1">
                  {fmtDate(e.startDate)} — {fmtDate(e.endDate)}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs"
                    onClick={() =>
                      setScreen({
                        name: "event",
                        eventId: e.id,
                        tab: "info",
                      })
                    }
                  >
                    Abrir evento
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </MobileShell>
    );
  };

  const EventPage = ({ eventId, tab = "info" }) => {
    const ev = events.find((e) => e.id === eventId);
    const now = new Date();
    if (!currentUser || !ev) return <MyEvents />;
    const canAccess =
      currentUser.enrolledEventIds.includes(ev.id) && ev.active;
    if (!canAccess)
      return (
        <MobileShell title="Acesso ao evento">
          <div className="p-6 text-center text-sm">
            Este evento não está disponível para sua conta.
          </div>
        </MobileShell>
      );

    const tabs = [
      { key: "info", label: "Informações" },
      { key: "map", label: "Mapa" },
      { key: "schedule", label: "Cronograma" },
      { key: "partners", label: "Restaurantes" },
      { key: "feedback", label: "Feedback do Evento" },
    ];

    const TabButton = ({ t }) => (
      <button
        className={`px-3 py-2 rounded-xl text-xs ${
          tab === t.key ? "bg-blue-600 text-white" : "bg-zinc-100"
        }`}
        onClick={() =>
          setScreen({ name: "event", eventId: ev.id, tab: t.key })
        }
      >
        {t.label}
      </button>
    );

    return (
      <MobileShell title={ev.name}>
        <div className="p-4 space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {tabs.map((t) => (
              <TabButton key={t.key} t={t} />
            ))}
          </div>

          {tab === "info" && (
            <div className="rounded-2xl border bg-white p-4 text-sm space-y-2">
              <div><b>Local:</b> {ev.location}</div>
              <div>
                <b>Período:</b> {fmtDate(ev.startDate)} — {fmtDate(ev.endDate)}
              </div>
              <p className="text-zinc-700">{ev.description}</p>
            </div>
          )}

          {tab === "map" && (
            <div className="rounded-2xl border bg-white p-4 text-sm">
              <div className="text-xs text-zinc-500 mb-2">
                (Mapa estático protótipo)
              </div>
              <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-100 to-sky-200 flex items-center justify-center text-xs text-zinc-600">
                Mapa / Coordenadas ({ev.lat}, {ev.lng})
              </div>
            </div>
          )}

            {tab === "partners" && (
              <div className="space-y-2">
                {(ev.partners || []).map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl border bg-white p-4 text-sm flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-zinc-600">
                        {p.type} {p.discount ? `• ${p.discount}` : ""}
                      </div>
                    </div>
                    <a
                      className="text-xs underline text-blue-700"
                      href={p.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir no Maps
                    </a>
                  </div>
                ))}
                {(!ev.partners || ev.partners.length === 0) && (
                  <div className="text-xs text-zinc-500">
                    Sem parceiros cadastrados.
                  </div>
                )}
              </div>
            )}

          {tab === "schedule" && (
            <div className="space-y-2">
              {(ev.schedule || []).map((s) => (
                <div key={s.id} className="rounded-2xl border bg-white p-4 text-sm">
                  <div className="font-medium">{s.title}</div>
                  {s.desc && (
                    <div className="text-xs text-zinc-600">{s.desc}</div>
                  )}
                  <div className="text-xs text-zinc-500 mt-1">
                    {fmtDate(s.start)} — {fmtDate(s.end)}{" "}
                    {s.room ? `• ${s.room}` : ""}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1.5 rounded-xl bg-zinc-100 text-xs">
                      Lembrar por e-mail
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-xl bg-rose-100 text-xs"
                      onClick={() =>
                        setFeedbackModal({
                          open: true,
                          eventId: ev.id,
                          slotId: s.id,
                        })
                      }
                    >
                      Feedback
                    </button>
                  </div>
                </div>
              ))}
              {(!ev.schedule || ev.schedule.length === 0) && (
                <div className="text-xs text-zinc-500">Sem atividades cadastradas.</div>
              )}
            </div>
          )}

          {tab === "feedback" && (
            <div className="rounded-2xl border bg-white p-4">
              {now < new Date(ev.feedbackGeneralOpensAt) ? (
                <div className="text-sm text-zinc-600">
                  Feedback do evento disponível em{" "}
                  <b>{fmtDate(ev.feedbackGeneralOpensAt)}</b>.
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div className="font-medium">
                    Como foi sua experiência geral?
                  </div>
                  <div className="flex gap-1">
                    {"★★★★★".split("").map((_, i) => (
                      <button
                        key={i}
                        className="px-2 py-1 rounded bg-amber-100 text-amber-800 text-xs"
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="w-full rounded-xl border p-2"
                    placeholder="Comentários (opcional)"
                    rows={3}
                  ></textarea>
                  <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">
                    Enviar feedback
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {feedbackModal.open && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
            <div className="w-full max-w-sm rounded-2xl bg-white p-4 space-y-3">
              <div className="text-sm font-semibold">Feedback da atividade</div>
              <div className="flex gap-1 text-amber-700">
                {"★★★★★".split("").map((_, i) => (
                  <button
                    key={i}
                    className="px-2 py-1 rounded bg-amber-100 text-xs"
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                className="w-full rounded-xl border p-2"
                placeholder="Comentário (opcional)"
                rows={3}
              ></textarea>
              <div className="flex gap-2 justify-end">
                <button
                  className="px-3 py-1.5 rounded-xl bg-zinc-100 text-xs"
                  onClick={() => setFeedbackModal({ open: false })}
                >
                  Cancelar
                </button>
                <button
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs"
                  onClick={() => setFeedbackModal({ open: false })}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </MobileShell>
    );
  };

  const Profile = () => {
    const [form, setForm] = useState(
      currentUser
        ? {
            name: currentUser.name,
            company: currentUser.company,
            phone: currentUser.phone || "",
            optin: currentUser.optinEmail,
          }
        : {
            name: "",
            company: "",
            phone: "",
            optin: false,
          }
    );
    if (!currentUser) return <Login />;
    return (
      <MobileShell title="Perfil">
        <div className="p-6 space-y-3">
          <input
            className="w-full px-3 py-2 rounded-xl border"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full px-3 py-2 rounded-xl border"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <input
            className="w-full px-3 py-2 rounded-xl border"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <label className="text-xs flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.optin}
              onChange={(e) => setForm({ ...form, optin: e.target.checked })}
            />
            Receber notificações por e-mail
          </label>
          <div className="flex gap-2 pt-2">
            <button
              className="px-4 py-2 rounded-xl bg-blue-600 text-white"
              onClick={() => setScreen({ name: "myEvents" })}
            >
              Salvar
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-zinc-100"
              onClick={() => setScreen({ name: "welcome" })}
            >
              Cancelar
            </button>
          </div>
        </div>
      </MobileShell>
    );
  };

  const Admin = () => {
    if (!currentUser || !currentUser.isAdmin)
      return (
        <MobileShell title="Admin">
          <div className="p-6 text-sm text-center">Acesso restrito.</div>
        </MobileShell>
      );
    return (
      <MobileShell title="Admin – Eventos">
        <div className="p-4 space-y-3">
          {events.map((e) => (
            <div
              key={e.id}
              className="rounded-2xl border bg-white p-4 flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-semibold">{e.name}</div>
                <div className="text-xs text-zinc-600">/e/{e.slug}</div>
              </div>
              <div className="flex items-center gap-2">
                <Chip tone={e.active ? "green" : "rose"}>
                  {e.active ? "Ativo" : "Inativo"}
                </Chip>
                <button
                  className="px-3 py-1.5 rounded-xl bg-zinc-100 text-xs"
                  onClick={() =>
                    setEvents((arr) =>
                      arr.map((x) =>
                        x.id === e.id ? { ...x, active: !x.active } : x
                      )
                    )
                  }
                >
                  {e.active ? "Desativar" : "Ativar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </MobileShell>
    );
  };

  if (screen.name === "welcome") return <Welcome />;
  if (screen.name === "landing") return <Landing slug={screen.slug} />;
  if (screen.name === "login") return <Login fromSlug={screen.fromSlug} />;
  if (screen.name === "register") return <Register fromSlug={screen.fromSlug} />;
  if (screen.name === "myEvents") return <MyEvents />;
  if (screen.name === "event")
    return <EventPage eventId={screen.eventId} tab={screen.tab} />;
  if (screen.name === "profile") return <Profile />;
  if (screen.name === "admin") return <Admin />;
  return <Welcome />;
}
