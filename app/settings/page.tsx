'use client';

import React from 'react';
import { DashboardLayout } from '@/components/app/Layout';

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="border-b-2 border-white/20 pb-6">
                    <h1 className="text-3xl lg:text-4xl mb-2 text-white">
                        CONFIGURAÇÕES
                    </h1>
                    <p className="text-sm tech-text text-white/50 tracking-wider">
                        PERSONALIZE O COMPORTAMENTO DO BOT
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute -inset-1 bg-white/10 blur-xl" />
                    <div className="relative bg-[#0A0A0A] border-2 border-white chamfer p-12">
                        <div className="absolute inset-3 border border-white/20 chamfer-sm pointer-events-none" />

                        <div className="relative flex flex-col items-center justify-center text-center space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 blur-xl" />
                                <div className="relative w-24 h-24 bg-white flex items-center justify-center chamfer">
                                    <div className="w-20 h-20 bg-[#0A0A0A] flex items-center justify-center chamfer-sm">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                            <path strokeLinecap="square" strokeLinejoin="miter" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="square" strokeLinejoin="miter" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 max-w-md">
                                <h2 className="text-2xl text-white">
                                    EM DESENVOLVIMENTO
                                </h2>
                                <p className="text-sm tech-text text-white/40 tracking-wider">
                                    FUNCIONALIDADE EM BREVE
                                </p>
                                <div className="h-px bg-white/10 my-4" />
                                <p className="text-sm text-white/60 body-text leading-relaxed">
                                    Esta seção permitirá configurar parâmetros do bot como:
                                </p>
                                <ul className="text-sm text-white/50 body-text space-y-2 text-left max-w-sm mx-auto">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-white/50" />
                                        <span>Dia de execução da cobrança</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-white/50" />
                                        <span>Horário de envio das mensagens</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-white/50" />
                                        <span>Personalização do texto da mensagem</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1 h-1 bg-white/50" />
                                        <span>Configuração da planilha Google Sheets</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <div className="w-2 h-2 bg-white/20" />
                                <div className="w-2 h-2 bg-white/40" />
                                <div className="w-2 h-2 bg-white/20" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-xs tech-text text-white/30 tracking-widest">
                        AGUARDE ATUALIZAÇÕES FUTURAS
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}