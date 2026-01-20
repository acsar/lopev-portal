<template>
    <footer class="bg-[#002d1e] text-white py-12 mt-auto">
        <UContainer>
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

                <div class="md:col-span-4 flex flex-col items-start">
                    <img src="/logo_footer.png" alt="Lopev Logo" class="h-12 w-auto mb-6 brightness-0 invert" />
                    <p class="text-sm text-gray-400 max-w-xs leading-relaxed">
                        Tecnologia e inovação a serviço da saúde, garantindo a segurança e privacidade dos seus dados
                        médicos.
                    </p>
                </div>

                <div class="md:col-span-4">
                    <h3 class="text-sm font-bold uppercase tracking-widest icons-medical mb-6">
                        Certificações
                    </h3>
                    <ul class="space-y-4">
                        <li>
                            <ULink to="#"
                                class="text-gray-300 hover:text-white flex items-center gap-2 transition-colors text-sm">
                                <UIcon name="i-lucide-shield-check" class="w-4 h-4 icons-medical" />
                                Conformidade LGPD
                            </ULink>
                        </li>
                        <li>
                            <ULink to="#"
                                class="text-gray-300 hover:text-white flex items-center gap-2 transition-colors text-sm">
                                <UIcon name="i-lucide-award" class="w-4 h-4 icons-medical" />
                                Rapidoc
                            </ULink>
                        </li>
                    </ul>

                    <div class="mt-8">
                        <h4 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                            Parcerias de Saúde
                        </h4>
                        <div class="flex gap-4 grayscale opacity-50">
                            <UIcon name="i-lucide-activity" class="w-6 h-6 text-white" />
                            <UIcon name="i-lucide-heart-pulse" class="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div class="md:col-span-4">
                    <h3 class="text-sm font-bold uppercase tracking-widest icons-medical mb-6">
                        Sobre
                    </h3>
                    <nav class="flex flex-col gap-4">
                        <ULink to="#" class="text-sm text-gray-300 hover:text-white transition-colors">
                            Política de Privacidade
                        </ULink>
                        <ULink to="#" class="text-sm text-gray-300 hover:text-white transition-colors">
                            Termos de Uso
                        </ULink>
                        <ULink to="#" class="text-sm text-gray-300 hover:text-white transition-colors">
                            Contato
                        </ULink>
                    </nav>
                </div>

            </div>

            <USeparator class="my-10 opacity-10" color="neutral" />

            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-[10px] text-gray-500 uppercase tracking-tighter">
                    © {{ new Date().getFullYear() }} Lopev Minisite - Todos os direitos reservados.
                </p>
                <div class="flex gap-4">
                    <UButton icon="i-lucide-facebook" variant="ghost" color="neutral" size="xs" />
                    <UButton icon="i-lucide-instagram" variant="ghost" color="neutral" size="xs" />
                    <UButton icon="i-lucide-linkedin" variant="ghost" color="neutral" size="xs" />
                </div>
            </div>
        </UContainer>
    </footer>
</template>