<template>
    <v-container>
        <v-row v-if="modeChoix=='multiple'">
            <v-col>
                <v-btn
                    rounded="lg"
                    @click="choixTermine()"
                >Choix terminé</v-btn>
            </v-col>
        </v-row>
        <v-row v-for="(uon0, index) in unitesOrgTree" :key="uon0.id">
            <v-col>
                <!-- Niveau 0 -->
                <v-expansion-panels v-model="panelN0">
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            <div class="d-flex align-center">
                                <v-checkbox v-if="modeChoix=='multiple'"
                                    v-model="uon0.bcheck"
                                    density="compact"
                                    hide-details
                                    class="mt-0 pt-0 mr-2"
                                    @click.stop="choixMultiple(uon0)"
                                ></v-checkbox>
                                <v-checkbox v-else
                                    v-model="uon0.bcheck"
                                    density="compact"
                                    hide-details
                                    class="mt-0 pt-0 mr-2"
                                    @click.stop="choix(uon0)"
                                ></v-checkbox>
                                <v-tooltip :text="uon0.description">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-bind:=props
                                            class="text-none text-subtitle-1"
                                            size="small"
                                            variant="flat"
                                        >
                                            {{ uon0.nom }}
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                            </div>                                                
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <!-- Niveau 1 directions -->
                            <div v-for="(uon1, index) in uon0.enfants" :key="uon1.id">
                                <div v-if="uon1.enfants.length === 0 && (uon1.bcache === 0 || buniteHorVdL)">
                                    <div class="d-flex align-center">
                                        <span class="spnalign"></span>
                                        <v-checkbox  v-if="modeChoix=='multiple'"
                                            v-model="uon1.bcheck"
                                            density="compact"
                                            hide-details
                                            class="mt-0 pt-0 mr-2"
                                            @click.stop="choixMultiple(uon1)"
                                        ></v-checkbox>
                                        <v-checkbox v-else
                                            v-model="uon1.bcheck"
                                            density="compact"
                                            hide-details
                                            class="mt-0 pt-0 mr-2"
                                            @click.stop="choix(uon1)"
                                        ></v-checkbox>
                                        <v-tooltip :text="uon1.description">
                                            <template v-slot:activator="{ props }">
                                                <v-btn
                                                    v-bind:=props
                                                    class="text-none text-subtitle-1 text-medium-emphasis"
                                                    size="small"
                                                    variant="flat"
                                                >
                                                    {{ uon1.nom }}
                                                </v-btn>
                                            </template>
                                        </v-tooltip>                                                
                                    </div>
                                </div>    
                                <div v-else-if="uon1.bcache === 0 || buniteHorVdL">
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-title>
                                                <div class="d-flex align-center">
                                                    <v-checkbox v-if="modeChoix=='multiple'"
                                                        v-model="uon1.bcheck" 
                                                        density="compact"
                                                        hide-details
                                                        class="mt-0 pt-0 mr-2"
                                                        @click.stop="choixMultiple(uon1)"
                                                    ></v-checkbox>
                                                    <v-checkbox v-else
                                                        v-model="uon1.bcheck" 
                                                        density="compact"
                                                        hide-details
                                                        class="mt-0 pt-0 mr-2"
                                                        @click.stop="choix(uon1)"
                                                    ></v-checkbox>
                                                    <v-tooltip :text="uon1.description">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn
                                                                v-bind:=props
                                                                class="text-none text-subtitle-1"
                                                                size="small"
                                                                variant="flat"
                                                            >
                                                                {{ uon1.nom }}
                                                            </v-btn>
                                                        </template>
                                                    </v-tooltip>
                                                </div>                                                
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <!-- Niveau 2 services -->
                                                <div v-for="(uon2, index) in uon1.enfants" :key="uon2.id">
                                                    <div v-if="uon2.enfants.length === 0">
                                                        <div class="d-flex align-center">
                                                            <span class="spnalign"></span>
                                                            <v-checkbox  v-if="modeChoix=='multiple'"
                                                                v-model="uon2.bcheck" 
                                                                density="compact"
                                                                hide-details
                                                                class="mt-0 pt-0 mr-2"
                                                                @click.stop="choixMultiple(uon2)"
                                                            ></v-checkbox>
                                                            <v-checkbox  v-else
                                                                v-model="uon2.bcheck" 
                                                                density="compact"
                                                                hide-details
                                                                class="mt-0 pt-0 mr-2"
                                                                @click.stop="choix(uon2)"
                                                            ></v-checkbox>
                                                            <v-tooltip :text="uon2.description">
                                                                <template v-slot:activator="{ props }">
                                                                    <v-btn
                                                                        v-bind:=props
                                                                        class="text-none text-subtitle-1 text-medium-emphasis"
                                                                        size="small"
                                                                        variant="flat"
                                                                    >
                                                                        {{ uon2.nom }}
                                                                    </v-btn>
                                                                </template>
                                                            </v-tooltip>
                                                        </div>                                                
                                                    </div>    
                                                    <div v-else>
                                                        <v-expansion-panels>
                                                            <v-expansion-panel>
                                                                <v-expansion-panel-title>
                                                                    <div class="d-flex align-center">
                                                                        <v-checkbox v-if="modeChoix=='multiple'"
                                                                            v-model="uon2.bcheck" 
                                                                            density="compact"
                                                                            hide-details
                                                                            class="mt-0 pt-0 mr-2"
                                                                            @click.stop="choixMultiple(uon2)"
                                                                        ></v-checkbox>
                                                                        <v-checkbox v-else
                                                                            v-model="uon2.bcheck" 
                                                                            density="compact"
                                                                            hide-details
                                                                            class="mt-0 pt-0 mr-2"
                                                                            @click.stop="choix(uon2)"
                                                                        ></v-checkbox>
                                                                        <v-tooltip :text="uon2.description">
                                                                            <template v-slot:activator="{ props }">
                                                                                <v-btn
                                                                                    v-bind:=props
                                                                                    class="text-none text-subtitle-1"
                                                                                    size="small"
                                                                                    variant="flat"
                                                                                >
                                                                                    {{ uon2.nom }}
                                                                                </v-btn>
                                                                            </template>
                                                                        </v-tooltip>
                                                                    </div>                                                  
                                                                </v-expansion-panel-title>
                                                                <v-expansion-panel-text>
                                                                    <!-- Niveau 3 sous-services -->
                                                                    <div v-for="(uon3, index) in uon2.enfants" :key="uon3.id">
                                                                        <div v-if="uon3.enfants.length === 0">
                                                                            <div class="d-flex align-center">
                                                                                <span class="spnalign"></span>
                                                                                <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                    v-model="uon3.bcheck"
                                                                                    density="compact"
                                                                                    hide-details
                                                                                    class="mt-0 pt-0 mr-2"
                                                                                    @click.stop="choixMultiple(uon3)"
                                                                                ></v-checkbox>
                                                                                <v-checkbox  v-else
                                                                                    v-model="uon3.bcheck"
                                                                                    density="compact"
                                                                                    hide-details
                                                                                    class="mt-0 pt-0 mr-2"
                                                                                    @click.stop="choix(uon3)"
                                                                                ></v-checkbox>
                                                                               <v-tooltip :text="uon3.description">
                                                                                    <template v-slot:activator="{ props }">
                                                                                        <v-btn
                                                                                            v-bind:=props
                                                                                            class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                            size="small"
                                                                                            variant="flat"
                                                                                        >
                                                                                            {{ uon3.nom }}
                                                                                        </v-btn>
                                                                                    </template>
                                                                                </v-tooltip>
                                                                            </div>                                                
                                                                        </div>    
                                                                        <div v-else>
                                                                            <v-expansion-panels>
                                                                                <v-expansion-panel>
                                                                                    <v-expansion-panel-title>
                                                                                        <div class="d-flex align-center">
                                                                                            <v-checkbox v-if="modeChoix=='multiple'"
                                                                                                v-model="uon3.bcheck"
                                                                                                density="compact"
                                                                                                hide-details
                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                @click.stop="choixMultiple(uon3)"
                                                                                            ></v-checkbox>
                                                                                            <v-checkbox v-else
                                                                                                v-model="uon3.bcheck"
                                                                                                density="compact"
                                                                                                hide-details
                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                @click.stop="choix(uon3)"
                                                                                            ></v-checkbox>
                                                                                           <v-tooltip :text="uon3.description">
                                                                                                <template v-slot:activator="{ props }">
                                                                                                    <v-btn
                                                                                                        v-bind:=props
                                                                                                        class="text-none text-subtitle-1"
                                                                                                        size="small"
                                                                                                        variant="flat"
                                                                                                    >
                                                                                                        {{ uon3.nom }}
                                                                                                    </v-btn>
                                                                                                </template>
                                                                                            </v-tooltip>
                                                                                        </div>                                                
                                                                                    </v-expansion-panel-title>
                                                                                    <v-expansion-panel-text>
                                                                                        <!-- Niveau 4 -->
                                                                                        <div v-for="(uon4, index) in uon3.enfants" :key="uon4.id">
                                                                                            <div v-if="uon4.enfants.length === 0">
                                                                                                <div class="d-flex align-center">
                                                                                                    <span class="spnalign"></span>
                                                                                                    <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                                        v-model="uon4.bcheck"
                                                                                                        density="compact"
                                                                                                        hide-details
                                                                                                        class="mt-0 pt-0 mr-2"
                                                                                                        @click.stop="choixMultiple(uon4)"
                                                                                                    ></v-checkbox>
                                                                                                    <v-checkbox  v-else
                                                                                                        v-model="uon4.bcheck"
                                                                                                        density="compact"
                                                                                                        hide-details
                                                                                                        class="mt-0 pt-0 mr-2"
                                                                                                        @click.stop="choix(uon4)"
                                                                                                    ></v-checkbox>
                                                                                                    <v-tooltip :text="uon4.description">
                                                                                                        <template v-slot:activator="{ props }">
                                                                                                            <v-btn
                                                                                                                v-bind:=props
                                                                                                                class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                                                size="small"
                                                                                                                variant="flat"
                                                                                                            >
                                                                                                                {{ uon4.nom }}
                                                                                                            </v-btn>
                                                                                                        </template>
                                                                                                    </v-tooltip>
                                                                                                </div>                                                
                                                                                            </div>    
                                                                                            <div v-else>
                                                                                                <v-expansion-panels>
                                                                                                    <v-expansion-panel>
                                                                                                        <v-expansion-panel-title>
                                                                                                            <div class="d-flex align-center">
                                                                                                                <v-checkbox v-if="modeChoix=='multiple'"
                                                                                                                    v-model="uon4.bcheck"
                                                                                                                    density="compact"
                                                                                                                    hide-details
                                                                                                                    class="mt-0 pt-0 mr-2"
                                                                                                                    @click.stop="choixMultiple(uon4)"
                                                                                                                ></v-checkbox>
                                                                                                                <v-checkbox v-else
                                                                                                                    v-model="uon4.bcheck"
                                                                                                                    density="compact"
                                                                                                                    hide-details
                                                                                                                    class="mt-0 pt-0 mr-2"
                                                                                                                    @click.stop="choix(uon4)"
                                                                                                                ></v-checkbox>
                                                                                                                <v-tooltip :text="uon4.description">
                                                                                                                    <template v-slot:activator="{ props }">
                                                                                                                        <v-btn
                                                                                                                            v-bind:=props
                                                                                                                            class="text-none text-subtitle-1"
                                                                                                                            size="small"
                                                                                                                            variant="flat"
                                                                                                                        >
                                                                                                                            {{ uon4.nom }}
                                                                                                                        </v-btn>
                                                                                                                    </template>
                                                                                                                </v-tooltip>
                                                                                                            </div>                                                
                                                                                                        </v-expansion-panel-title>
                                                                                                        <v-expansion-panel-text>
                                                                                                            <!-- Niveau 5 -->
                                                                                                            <div v-for="(uon5, index) in uon4.enfants" :key="uon5.id">
                                                                                                                <div v-if="uon5.enfants.length === 0">
                                                                                                                    <div class="d-flex align-center">
                                                                                                                        <span class="spnalign"></span>
                                                                                                                        <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                                                            v-model="uon5.bcheck"
                                                                                                                            density="compact"
                                                                                                                            hide-details
                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                            @click.stop="choixMultiple(uon5)"
                                                                                                                        ></v-checkbox>
                                                                                                                        <v-checkbox  v-else
                                                                                                                            v-model="uon5.bcheck"
                                                                                                                            density="compact"
                                                                                                                            hide-details
                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                            @click.stop="choix(uon5)"
                                                                                                                        ></v-checkbox>
                                                                                                                        <v-tooltip :text="uon5.description">
                                                                                                                            <template v-slot:activator="{ props }">
                                                                                                                                <v-btn
                                                                                                                                    v-bind:=props
                                                                                                                                    class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                                                                    size="small"
                                                                                                                                    variant="flat"
                                                                                                                                >
                                                                                                                                    {{ uon5.nom }}
                                                                                                                                </v-btn>
                                                                                                                            </template>
                                                                                                                        </v-tooltip>
                                                                                                                    </div>                                                
                                                                                                                </div>    
                                                                                                                <div v-else>
                                                                                                                    <v-expansion-panels>
                                                                                                                        <v-expansion-panel>
                                                                                                                            <v-expansion-panel-title>
                                                                                                                                <div class="d-flex align-center">
                                                                                                                                    <v-checkbox v-if="modeChoix=='multiple'"
                                                                                                                                        v-model="uon5.bcheck"
                                                                                                                                        density="compact"
                                                                                                                                        hide-details
                                                                                                                                        class="mt-0 pt-0 mr-2"
                                                                                                                                        @click.stop="choixMultiple(uon5)"
                                                                                                                                    ></v-checkbox>
                                                                                                                                    <v-checkbox v-else
                                                                                                                                        v-model="uon5.bcheck"
                                                                                                                                        density="compact"
                                                                                                                                        hide-details
                                                                                                                                        class="mt-0 pt-0 mr-2"
                                                                                                                                        @click.stop="choix(uon5)"
                                                                                                                                    ></v-checkbox>
                                                                                                                                    <v-tooltip :text="uon5.description">
                                                                                                                                        <template v-slot:activator="{ props }">
                                                                                                                                            <v-btn
                                                                                                                                                v-bind:=props
                                                                                                                                                class="text-none text-subtitle-1"
                                                                                                                                                size="small"
                                                                                                                                                variant="flat"
                                                                                                                                            >
                                                                                                                                                {{ uon5.nom }}
                                                                                                                                            </v-btn>
                                                                                                                                        </template>
                                                                                                                                    </v-tooltip>
                                                                                                                                </div>                                                
                                                                                                                            </v-expansion-panel-title>
                                                                                                                            <v-expansion-panel-text>
                                                                                                                                <!-- Niveau 6 -->
                                                                                                                                <div v-for="(uon6, index) in uon5.enfants" :key="uon6.id">
                                                                                                                                    <div v-if="uon6.enfants.length === 0">
                                                                                                                                        <div class="d-flex align-center">
                                                                                                                                            <span class="spnalign"></span>
                                                                                                                                            <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                                                                                v-model="uon6.bcheck"
                                                                                                                                                density="compact"
                                                                                                                                                hide-details
                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                @click.stop="choixMultiple(uon6)"
                                                                                                                                            ></v-checkbox>
                                                                                                                                            <v-checkbox  v-else
                                                                                                                                                v-model="uon6.bcheck"
                                                                                                                                                density="compact"
                                                                                                                                                hide-details
                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                @click.stop="choix(uon6)"
                                                                                                                                            ></v-checkbox>
                                                                                                                                            <v-tooltip :text="uon6.description">
                                                                                                                                                <template v-slot:activator="{ props }">
                                                                                                                                                    <v-btn
                                                                                                                                                        v-bind:=props
                                                                                                                                                        class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                                                                                        size="small"
                                                                                                                                                        variant="flat"
                                                                                                                                                    >
                                                                                                                                                        {{ uon6.nom }}
                                                                                                                                                    </v-btn>
                                                                                                                                                </template>
                                                                                                                                            </v-tooltip>
                                                                                                                                        </div>                                                
                                                                                                                                    </div>    
                                                                                                                                    <div v-else>
                                                                                                                                        <v-expansion-panels>
                                                                                                                                            <v-expansion-panel>
                                                                                                                                                <v-expansion-panel-title>
                                                                                                                                                    <div class="d-flex align-center">
                                                                                                                                                        <v-checkbox v-if="modeChoix=='multiple'"
                                                                                                                                                            v-model="uon6.bcheck"
                                                                                                                                                            density="compact"
                                                                                                                                                            hide-details
                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                            @click.stop="choixMultiple(uon6)"
                                                                                                                                                        ></v-checkbox>
                                                                                                                                                        <v-checkbox v-else
                                                                                                                                                            v-model="uon6.bcheck"
                                                                                                                                                            density="compact"
                                                                                                                                                            hide-details
                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                            @click.stop="choix(uon6)"
                                                                                                                                                        ></v-checkbox>
                                                                                                                                                        <v-tooltip :text="uon6.description">
                                                                                                                                                            <template v-slot:activator="{ props }">
                                                                                                                                                                <v-btn
                                                                                                                                                                    v-bind:=props
                                                                                                                                                                    class="text-none text-subtitle-1"
                                                                                                                                                                    size="small"
                                                                                                                                                                    variant="flat"
                                                                                                                                                                >
                                                                                                                                                                    {{ uon6.nom }}
                                                                                                                                                                </v-btn>
                                                                                                                                                            </template>
                                                                                                                                                        </v-tooltip>
                                                                                                                                                    </div>                                                
                                                                                                                                                </v-expansion-panel-title>
                                                                                                                                                <v-expansion-panel-text>
                                                                                                                                                <!-- Niveau 7 -->
                                                                                                                                                <div v-for="(uon7, index) in uon6.enfants" :key="uon7.id">
                                                                                                                                                    <div v-if="uon7.enfants.length === 0">
                                                                                                                                                        <div class="d-flex align-center">
                                                                                                                                                            <span class="spnalign"></span>
                                                                                                                                                            <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                                                                                                v-model="uon7.bcheck"
                                                                                                                                                                density="compact"
                                                                                                                                                                hide-details
                                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                                @click.stop="choixMultiple(uon7)"
                                                                                                                                                            ></v-checkbox>
                                                                                                                                                            <v-checkbox  v-else
                                                                                                                                                                v-model="uon7.bcheck"
                                                                                                                                                                density="compact"
                                                                                                                                                                hide-details
                                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                                @click.stop="choix(uon7)"
                                                                                                                                                            ></v-checkbox>
                                                                                                                                                            <v-tooltip :text="uon7.description">
                                                                                                                                                                <template v-slot:activator="{ props }">
                                                                                                                                                                    <v-btn
                                                                                                                                                                        v-bind:=props
                                                                                                                                                                        class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                                                                                                        size="small"
                                                                                                                                                                        variant="flat"
                                                                                                                                                                    >
                                                                                                                                                                        {{ uon7.nom }}
                                                                                                                                                                    </v-btn>
                                                                                                                                                                </template>
                                                                                                                                                            </v-tooltip>
                                                                                                                                                        </div>                                                
                                                                                                                                                    </div>    
                                                                                                                                                    <div v-else>
                                                                                                                                                        <v-expansion-panels>
                                                                                                                                                            <v-expansion-panel>
                                                                                                                                                                <v-expansion-panel-title>
                                                                                                                                                                    <div class="d-flex align-center">
                                                                                                                                                                        <v-checkbox v-if="modeChoix=='multiple'"
                                                                                                                                                                            v-model="uon7.bcheck"
                                                                                                                                                                            density="compact"
                                                                                                                                                                            hide-details
                                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                                            @click.stop="choixMultiple(uon7)"
                                                                                                                                                                        ></v-checkbox>
                                                                                                                                                                        <v-checkbox v-else
                                                                                                                                                                            v-model="uon7.bcheck"
                                                                                                                                                                            density="compact"
                                                                                                                                                                            hide-details
                                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                                            @click.stop="choix(uon7)"
                                                                                                                                                                        ></v-checkbox>
                                                                                                                                                                        <v-tooltip :text="uon7.description">
                                                                                                                                                                            <template v-slot:activator="{ props }">
                                                                                                                                                                                <v-btn
                                                                                                                                                                                    v-bind:=props
                                                                                                                                                                                    class="text-none text-subtitle-1"
                                                                                                                                                                                    size="small"
                                                                                                                                                                                    variant="flat"
                                                                                                                                                                                >
                                                                                                                                                                                    {{ uon7.nom }}
                                                                                                                                                                                </v-btn>
                                                                                                                                                                            </template>
                                                                                                                                                                        </v-tooltip>
                                                                                                                                                                    </div>                                                
                                                                                                                                                                </v-expansion-panel-title>
                                                                                                                                                                <v-expansion-panel-text>
                                                                                                                                                                <!-- Niveau 8 -->
                                                                                                                                                                <div v-for="(uon8, index) in uon7.enfants" :key="uon8.id">
                                                                                                                                                                    <div v-if="uon8.enfants.length === 0">
                                                                                                                                                                        <div class="d-flex align-center">
                                                                                                                                                                            <span class="spnalign"></span>
                                                                                                                                                                            <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                                                                                                                v-model="uon8.bcheck"
                                                                                                                                                                                density="compact"
                                                                                                                                                                                hide-details
                                                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                                                @click.stop="choixMultiple(uon8)"
                                                                                                                                                                            ></v-checkbox>
                                                                                                                                                                            <v-checkbox  v-else
                                                                                                                                                                                v-model="uon8.bcheck"
                                                                                                                                                                                density="compact"
                                                                                                                                                                                hide-details
                                                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                                                @click.stop="choix(uon8)"
                                                                                                                                                                            ></v-checkbox>
                                                                                                                                                                            <v-tooltip :text="uon8.description">
                                                                                                                                                                                <template v-slot:activator="{ props }">
                                                                                                                                                                                    <v-btn
                                                                                                                                                                                        v-bind:=props
                                                                                                                                                                                        class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                                                                                                                        size="small"
                                                                                                                                                                                        variant="flat"
                                                                                                                                                                                    >
                                                                                                                                                                                        {{ uon8.nom }}
                                                                                                                                                                                    </v-btn>
                                                                                                                                                                                </template>
                                                                                                                                                                            </v-tooltip>
                                                                                                                                                                        </div>                                                
                                                                                                                                                                    </div>    
                                                                                                                                                                    <div v-else>
                                                                                                                                                                        <v-expansion-panels>
                                                                                                                                                                            <v-expansion-panel>
                                                                                                                                                                                <v-expansion-panel-title>
                                                                                                                                                                                    <div class="d-flex align-center">
                                                                                                                                                                                        <v-checkbox v-if="modeChoix=='multiple'"
                                                                                                                                                                                            v-model="uon8.bcheck"
                                                                                                                                                                                            density="compact"
                                                                                                                                                                                            hide-details
                                                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                                                            @click.stop="choixMultiple(uon8)"
                                                                                                                                                                                        ></v-checkbox>
                                                                                                                                                                                        <v-checkbox v-else
                                                                                                                                                                                            v-model="uon8.bcheck"
                                                                                                                                                                                            density="compact"
                                                                                                                                                                                            hide-details
                                                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                                                            @click.stop="choix(uon8)"
                                                                                                                                                                                        ></v-checkbox>
                                                                                                                                                                                        <v-tooltip :text="uon8.description">
                                                                                                                                                                                            <template v-slot:activator="{ props }">
                                                                                                                                                                                                <v-btn
                                                                                                                                                                                                    v-bind:=props
                                                                                                                                                                                                    class="text-none text-subtitle-1"
                                                                                                                                                                                                    size="small"
                                                                                                                                                                                                    variant="flat"
                                                                                                                                                                                                >
                                                                                                                                                                                                    {{ uon8.nom }}
                                                                                                                                                                                                </v-btn>
                                                                                                                                                                                            </template>
                                                                                                                                                                                        </v-tooltip>
                                                                                                                                                                                    </div>                                                
                                                                                                                                                                                </v-expansion-panel-title>
                                                                                                                                                                                <v-expansion-panel-text>
                                                                                                                                                                                    !!! Niveau hiérarchique non traité, prévenir le support goéland !!!
                                                                                                                                                                                </v-expansion-panel-text>
                                                                                                                                                                            </v-expansion-panel>   
                                                                                                                                                                    </v-expansion-panels>
                                                                                                                                                                    </div>
                                                                                                                                                                </div>
                                                                                                                                                                </v-expansion-panel-text>
                                                                                                                                                            </v-expansion-panel>   
                                                                                                                                                    </v-expansion-panels>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                                </v-expansion-panel-text>
                                                                                                                                            </v-expansion-panel>   
                                                                                                                                    </v-expansion-panels>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                           </v-expansion-panel-text>
                                                                                                                        </v-expansion-panel>   
                                                                                                                </v-expansion-panels>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </v-expansion-panel-text>
                                                                                                    </v-expansion-panel>   
                                                                                            </v-expansion-panels>
                                                                                            </div>
                                                                                        </div>
                                                                                    </v-expansion-panel-text>
                                                                                </v-expansion-panel>   
                                                                        </v-expansion-panels>
                                                                        </div>
                                                                    </div>

                                                                </v-expansion-panel-text>
                                                            </v-expansion-panel>   
                                                    </v-expansion-panels>
                                                    </div>
                                                </div>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>   
                                </v-expansion-panels>
                                </div>
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>   
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getUnitesOrgListe } from '@/axioscalls.js'
import type { UniteOrg, ApiResponse }  from '@/axioscalls.js'

interface Props {
  modeChoix?: string
  uniteHorsVdL?: boolean  // Optionnel et de type booléen
  ssServer?: string
  ssPage?: string
}

type UnitesOrg = UniteOrg[]

interface UniteOrgTree {
  id: number;
  nom: string;
  description: string;
  bcache: number;
  bcheck: boolean;
  enfants: UniteOrgTree[];
}

interface UniteOrgChoix {
  id: number;
  nom: string;
  description: string;
}

const props = withDefaults(defineProps<Props>(), {
  modeChoix: 'unique',
  uniteHorsVdL: false,
  ssServer: '',
  ssPage: '/goeland/uniteorg/axios/uniteorg_liste.php'
})

const modeChoix = ref<string>(props.modeChoix)
watch(() => props.modeChoix, (newValue) => {
  modeChoix.value = newValue
})

const buniteHorVdL = ref<boolean>(props.uniteHorsVdL)
watch(() => props.uniteHorsVdL, (newValue) => {
  buniteHorVdL.value = newValue
})

const ssServer = ref<string>(props.ssServer)
const ssPage = ref<string>(props.ssPage)

const response: ApiResponse = await getUnitesOrgListe(ssServer.value, ssPage.value)
const unitesOrgListe: UniteOrg[] = response.success && response.data ? response.data : []

const unitesOrgTree = ref<UniteOrgTree[]>(transforUOListe2UOTree(unitesOrgListe))
console.log(unitesOrgTree.value)

const panelN0 = ref<number[]>([0])

const emit = defineEmits<{
  (e: 'choixUniteOrg', choix: string): void
}>()

const unitesOrgListeChoisi = ref<UniteOrgChoix[]>([])

function transforUOListe2UOTree(unitesOrgListe: UniteOrg[]): UniteOrgTree[] {
    // Fonction interne pour créer un nœud d'arbre à partir d'une unité organisationnelle
    const createTreeNode = (uniteOrg: UniteOrg): UniteOrgTree => ({
        id: uniteOrg.iduniteorg,
        nom: uniteOrg.nomuniteorg,
        description: uniteOrg.descriptionuniteorg,
        bcache: uniteOrg.bcache,
        bcheck: false,
        enfants: []
    })

    // Fonction récursive pour construire l'arbre
    const buildTreeRecursive = (parentId: number | null, depth: number = 0): UniteOrgTree[] => {
        // Vérifier la profondeur de récursion
        const maxdepth: number = 50
        if (depth >= maxdepth) {
            console.warn(`Limite de récursion atteinte (${maxdepth} niveaux). Possible référence cyclique détectée.`)
            return [];
        }
        // Filtrer les unités organisationnelles qui ont le parentId donné
        const childrenUnites = unitesOrgListe.filter(
            uniteOrg => uniteOrg.iduoparente === parentId
        )

        // Transformer chaque unité enfant en noeud d'arbre
        return childrenUnites.map(uniteOrg => {
            const treeNode = createTreeNode(uniteOrg)
            
            // Récursivement ajouter les enfants
            treeNode.enfants = buildTreeRecursive(uniteOrg.iduniteorg, depth + 1)
            
            return treeNode
        })
    }

    // Construire l'arbre à partir des unités racines (sans parent)
    return buildTreeRecursive(null)
}

const choix = (uniteOrg: UniteOrgTree) => {
  if (modeChoix.value === 'unique') {
    const uoChoisie: UniteOrgChoix = {
      id: uniteOrg.id,
      nom: uniteOrg.nom,
      description: uniteOrg.description,
    }
    emit('choixUniteOrg', JSON.stringify(uoChoisie))
  } else { // choix multiple
    choixMultiple(uniteOrg)
  }
}

// Fonction de choix multiple
const choixMultiple = (uniteOrg: UniteOrgTree) => {
  // Inverser l'état de la checkbox
  uniteOrg.bcheck = !uniteOrg.bcheck

  if (uniteOrg.bcheck) {
    // Ajouter uniquement si pas déjà présent
    if (!unitesOrgListeChoisi.value.some(objet => objet.id === uniteOrg.id)) {
      const uoChoisie: UniteOrgChoix = {
        id: uniteOrg.id,
        nom: uniteOrg.nom,
        description: uniteOrg.description,
      }
      unitesOrgListeChoisi.value.push(uoChoisie)
    }
  } else {
    // Supprimer l'unité si désélectionnée
    unitesOrgListeChoisi.value = unitesOrgListeChoisi.value.filter(
      objet => objet.id !== uniteOrg.id
    )
  }
}

// Fonction de confirmation du choix
const choixTermine = () => {
  emit('choixUniteOrg', JSON.stringify(unitesOrgListeChoisi.value))
}
</script>

<style scoped>
    .spnalign {
        padding-left: 23px;
    }
</style>