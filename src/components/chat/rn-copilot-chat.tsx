"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  X,
  RotateCcw,
  Code,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  sqlQuery?: string;
  queryResults?: Array<Record<string, unknown>>;
  executionTimeMs?: number;
  mode?: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "Qual o faturamento total e o ticket médio?",
  "Qual o impacto do frete no Nordeste vs SP?",
  "Quais as top 3 categorias por faturamento?",
  "Como o prazo de entrega afeta as avaliações?",
];

let msgCounter = 0;
function createMessageId(prefix: string): string {
  msgCounter += 1;
  return `${prefix}-${Date.now()}-${msgCounter}`;
}

function getFormattedTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function RNCopilotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const activeProject = "ecommerce-bi";
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedQueryId, setCopiedQueryId] = useState<string | null>(null);
  const [expandedQueryId, setExpandedQueryId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: "Olá! Sou o **RN Intelligence**, seu assistente analítico do dashboard de E-Commerce.\n\nVocê pode me fazer perguntas sobre **faturamento (GMV), ticket médio, logística regional (prazos/fretes) e categorias** da base Olist (98k pedidos).\n\nSelecione uma pergunta rápida abaixo ou digite sua dúvida:",
      timestamp: "Agora",
      mode: "rn_intelligence",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Foco no input ao abrir o chat
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Event listener global para acionar o chat a partir da navbar ou outros componentes
  useEffect(() => {
    const handleOpenCopilot = () => setIsOpen(true);
    window.addEventListener("open-rn-copilot", handleOpenCopilot);
    return () => window.removeEventListener("open-rn-copilot", handleOpenCopilot);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: createMessageId("user"),
      sender: "user",
      text,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          project_id: activeProject,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro na resposta da API.");
      }

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: createMessageId("assistant"),
        sender: "assistant",
        text: data.reply || "Resposta recebida com sucesso.",
        sqlQuery: data.sql_query,
        queryResults: data.query_results,
        executionTimeMs: data.execution_time_ms,
        mode: data.mode || "rag_analytical_engine",
        timestamp: getFormattedTime(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: createMessageId("error"),
        sender: "assistant",
        text: "Desculpe, ocorreu uma instabilidade na conexão com o servidor analítico. Por favor, tente novamente em alguns instantes.",
        timestamp: getFormattedTime(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyQuery = (query: string, id: string) => {
    navigator.clipboard.writeText(query);
    setCopiedQueryId(id);
    setTimeout(() => setCopiedQueryId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: createMessageId("welcome"),
        sender: "assistant",
        text: "Conversa reiniciada. Como posso ajudar na sua análise do E-Commerce hoje?",
        timestamp: "Agora",
        mode: "rn_intelligence",
      },
    ]);
  };

  // Renderização simples e segura de markdown leve (negrito, itálico, bullet points)
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, idx) => {
      // Negrito com **palavra**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.startsWith("• ") || line.startsWith("- ")) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-700 dark:text-slate-300 my-0.5">
            {parsedLine}
          </li>
        );
      }

      return (
        <p key={idx} className="my-1 leading-relaxed">
          {parsedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* 1. Botão Flutuante (FAB) no Canto Inferior Direito */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl shadow-xl transition-all duration-300 cursor-pointer border ${
            isOpen
              ? "bg-slate-900 text-white border-slate-700 hover:bg-slate-800"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400/40 hover:scale-105 hover:shadow-cyan-500/25 active:scale-95"
          }`}
          aria-label="Abrir assistente analítico RN Intelligence"
        >
          <div className="relative flex items-center justify-center">
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>

          <div className="flex flex-col text-left leading-tight">
            <span className="text-xs font-black tracking-wide flex items-center gap-1.5">
              RN Intelligence
              <span className="text-[9px] px-1 py-0.2 rounded bg-white/20 font-mono font-bold">
                IA
              </span>
            </span>
            <span className="text-[9px] opacity-90 font-medium hidden sm:block">
              Assistente Analítico
            </span>
          </div>
        </button>
      </div>

      {/* 2. Janela Flutuante do Chat RN Intelligence */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-20 right-2 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-[440px] md:w-[480px] h-[540px] max-h-[78vh] bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header da Janela */}
          <div className="p-3.5 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-950/60 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    RN Intelligence
                  </span>
                  <Badge variant="cyan" className="text-[9px] py-0 px-1.5 font-bold">
                    BI Copilot
                  </Badge>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  API Online • E-Commerce Brasil (Olist 98k)
                </span>
              </div>
            </div>

            {/* Botões de Ação do Header */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Reiniciar conversa"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Fechar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Corpo de Mensagens (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 shadow-sm text-xs ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-br-xs"
                      : "bg-slate-100/90 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-bl-xs"
                  }`}
                >
                  <div className="text-xs leading-relaxed">
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Bloco de Query SQL Executada (se houver) */}
                  {msg.sqlQuery && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedQueryId(expandedQueryId === msg.id ? null : msg.id)
                          }
                          className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                        >
                          <Code className="h-3 w-3" />
                          <span>SQL Executado no DuckDB</span>
                          {expandedQueryId === msg.id ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyQuery(msg.sqlQuery!, msg.id)}
                          className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                          title="Copiar SQL"
                        >
                          {copiedQueryId === msg.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-500" />
                              <span className="text-emerald-500 font-bold">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>

                      {expandedQueryId === msg.id && (
                        <pre className="p-2.5 rounded-lg bg-slate-950 text-cyan-300 font-mono text-[10px] overflow-x-auto border border-white/10 leading-snug">
                          {msg.sqlQuery}
                        </pre>
                      )}
                    </div>
                  )}

                  {/* Telemetria de Execução */}
                  {msg.executionTimeMs && (
                    <div className="mt-2 text-[9px] text-slate-400 dark:text-slate-500 font-mono flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Cpu className="h-2.5 w-2.5" />
                        {msg.mode}
                      </span>
                      <span>{msg.executionTimeMs.toFixed(1)} ms</span>
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Indicador de Carregamento */}
            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 w-fit">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-ping"></span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  RN Intelligence consultando dados analíticos...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sugestões Rápidas de Perguntas */}
          <div className="px-3 py-1.5 bg-slate-50/80 dark:bg-slate-950/40 border-t border-slate-200/80 dark:border-white/5 flex items-center gap-1.5 overflow-x-auto text-[10.5px] shrink-0 custom-scrollbar">
            <span className="text-slate-400 text-[10px] font-bold uppercase shrink-0">
              Sugestões:
            </span>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors whitespace-nowrap cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {q}
                </button>
              )
            )}
          </div>

          {/* Footer com Input e Envio */}
          <div className="p-3 bg-white dark:bg-[#090d16] border-t border-slate-200/80 dark:border-white/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Pergunte sobre faturamento, frete, Pareto, churn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-cyan-500 shadow-2xs disabled:opacity-60"
              />

              <Button
                type="submit"
                variant="cyan"
                size="sm"
                disabled={!inputMessage.trim() || isLoading}
                className="h-9 w-9 p-0 rounded-xl flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex items-center justify-between mt-2 text-[9px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <MessageCircle className="h-2.5 w-2.5 text-cyan-500" />
                Conectado ao RN Intelligence API
              </span>
              <a
                href="https://github.com/Renanbritto/rn-intelligence-api"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-500 flex items-center gap-0.5"
              >
                GitHub API
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
