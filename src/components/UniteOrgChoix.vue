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
        <v-row v-for="(uo, index) in unitesOrgTree" :key="uo.id">
            <v-col>
                <!-- Niveau 0 -->
                <v-expansion-panels v-model="panelN0">
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            <div class="d-flex align-center">
                                <v-checkbox v-if="modeChoix=='multiple'"
                                    v-model="uo.bcheck"
                                    density="compact"
                                    hide-details
                                    class="mt-0 pt-0 mr-2"
                                    @click.stop="choixMultiple(uo)"
                                ></v-checkbox>
                                <v-checkbox v-else
                                    v-model="uo.bcheck"
                                    density="compact"
                                    hide-details
                                    class="mt-0 pt-0 mr-2"
                                    @click.stop="choix(uo)"
                                ></v-checkbox>
                                <v-tooltip :text="uo.description">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-bind:=props
                                            class="text-none text-subtitle-1"
                                            size="small"
                                            variant="flat"
                                        >
                                            {{ uo.nom }}
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                            </div>                                                
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <!-- Niveau 1 directions -->
                            <div v-for="(uo, index) in uo.enfants" :key="uo.id">
                                <div v-if="uo.enfants.length === 0 && (uo.bcache === 0 || buniteHorVdL)">
                                    <div class="d-flex align-center">
                                        <span class="spnalign"></span>
                                        <v-checkbox  v-if="modeChoix=='multiple'"
                                            v-model="uo.bcheck"
                                            density="compact"
                                            hide-details
                                            class="mt-0 pt-0 mr-2"
                                            @click.stop="choixMultiple(uo)"
                                        ></v-checkbox>
                                        <v-checkbox v-else
                                            v-model="uo.bcheck"
                                            density="compact"
                                            hide-details
                                            class="mt-0 pt-0 mr-2"
                                            @click.stop="choix(uo)"
                                        ></v-checkbox>
                                        <v-tooltip :text="uo.description">
                                            <template v-slot:activator="{ props }">
                                                <v-btn
                                                    v-bind:=props
                                                    class="text-none text-subtitle-1 text-medium-emphasis"
                                                    size="small"
                                                    variant="flat"
                                                >
                                                    {{ uo.nom }}
                                                </v-btn>
                                            </template>
                                        </v-tooltip>                                                
                                    </div>
                                </div>    
                                <div v-else-if="uo.bcache === 0 || buniteHorVdL">
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-title>
                                                <div class="d-flex align-center">
                                                    <v-checkbox v-if="modeChoix=='multiple'"
                                                        v-model="uo.bcheck" 
                                                        density="compact"
                                                        hide-details
                                                        class="mt-0 pt-0 mr-2"
                                                        @click.stop="choixMultiple(uo)"
                                                    ></v-checkbox>
                                                    <v-checkbox v-else
                                                        v-model="uo.bcheck" 
                                                        density="compact"
                                                        hide-details
                                                        class="mt-0 pt-0 mr-2"
                                                        @click.stop="choix(uo)"
                                                    ></v-checkbox>
                                                    <v-tooltip :text="uo.description">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn
                                                                v-bind:=props
                                                                class="text-none text-subtitle-1"
                                                                size="small"
                                                                variant="flat"
                                                            >
                                                                {{ uo.nom }}
                                                            </v-btn>
                                                        </template>
                                                    </v-tooltip>
                                                </div>                                                
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <!-- Niveau 2 services -->
                                                <div v-for="(uo, index) in uo.enfants" :key="uo.id">
                                                    <div v-if="uo.enfants.length === 0">
                                                        <div class="d-flex align-center">
                                                            <span class="spnalign"></span>
                                                            <v-checkbox  v-if="modeChoix=='multiple'"
                                                                v-model="uo.bcheck" 
                                                                density="compact"
                                                                hide-details
                                                                class="mt-0 pt-0 mr-2"
                                                                @click.stop="choixMultiple(uo)"
                                                            ></v-checkbox>
                                                            <v-checkbox  v-else
                                                                v-model="uo.bcheck" 
                                                                density="compact"
                                                                hide-details
                                                                class="mt-0 pt-0 mr-2"
                                                                @click.stop="choix(uo)"
                                                            ></v-checkbox>
                                                            <v-tooltip :text="uo.description">
                                                                <template v-slot:activator="{ props }">
                                                                    <v-btn
                                                                        v-bind:=props
                                                                        class="text-none text-subtitle-1 text-medium-emphasis"
                                                                        size="small"
                                                                        variant="flat"
                                                                    >
                                                                        {{ uo.nom }}
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
                                                                            v-model="uo.bcheck" 
                                                                            density="compact"
                                                                            hide-details
                                                                            class="mt-0 pt-0 mr-2"
                                                                            @click.stop="choixMultiple(uo)"
                                                                        ></v-checkbox>
                                                                        <v-checkbox v-else
                                                                            v-model="uo.bcheck" 
                                                                            density="compact"
                                                                            hide-details
                                                                            class="mt-0 pt-0 mr-2"
                                                                            @click.stop="choix(uo)"
                                                                        ></v-checkbox>
                                                                        <v-tooltip :text="uo.description">
                                                                            <template v-slot:activator="{ props }">
                                                                                <v-btn
                                                                                    v-bind:=props
                                                                                    class="text-none text-subtitle-1"
                                                                                    size="small"
                                                                                    variant="flat"
                                                                                >
                                                                                    {{ uo.nom }}
                                                                                </v-btn>
                                                                            </template>
                                                                        </v-tooltip>
                                                                    </div>                                                  
                                                                </v-expansion-panel-title>
                                                                <v-expansion-panel-text>
                                                                    <!-- Niveau 3 sous-services -->
                                                                    <div v-for="(uo, index) in uo.enfants" :key="uo.id">
                                                                        <div v-if="uo.enfants.length === 0">
                                                                            <div class="d-flex align-center">
                                                                                <span class="spnalign"></span>
                                                                                <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                    v-model="uo.bcheck"
                                                                                    density="compact"
                                                                                    hide-details
                                                                                    class="mt-0 pt-0 mr-2"
                                                                                    @click.stop="choixMultiple(uo)"
                                                                                ></v-checkbox>
                                                                                <v-checkbox  v-else
                                                                                    v-model="uo.bcheck"
                                                                                    density="compact"
                                                                                    hide-details
                                                                                    class="mt-0 pt-0 mr-2"
                                                                                    @click.stop="choix(uo)"
                                                                                ></v-checkbox>
                                                                               <v-tooltip :text="uo.description">
                                                                                    <template v-slot:activator="{ props }">
                                                                                        <v-btn
                                                                                            v-bind:=props
                                                                                            class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                            size="small"
                                                                                            variant="flat"
                                                                                        >
                                                                                            {{ uo.nom }}
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
                                                                                                v-model="uo.bcheck"
                                                                                                density="compact"
                                                                                                hide-details
                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                @click.stop="choixMultiple(uo)"
                                                                                            ></v-checkbox>
                                                                                            <v-checkbox v-else
                                                                                                v-model="uo.bcheck"
                                                                                                density="compact"
                                                                                                hide-details
                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                @click.stop="choix(uo)"
                                                                                            ></v-checkbox>
                                                                                           <v-tooltip :text="uo.description">
                                                                                                <template v-slot:activator="{ props }">
                                                                                                    <v-btn
                                                                                                        v-bind:=props
                                                                                                        class="text-none text-subtitle-1"
                                                                                                        size="small"
                                                                                                        variant="flat"
                                                                                                    >
                                                                                                        {{ uo.nom }}
                                                                                                    </v-btn>
                                                                                                </template>
                                                                                            </v-tooltip>
                                                                                        </div>                                                
                                                                                    </v-expansion-panel-title>
                                                                                    <v-expansion-panel-text>
                                                                                        <!-- Niveau 4 -->
                                                                                        <div v-for="(uo, index) in uo.enfants" :key="uo.id">
                                                                                            <div v-if="uo.enfants.length === 0">
                                                                                                <div class="d-flex align-center">
                                                                                                    <span class="spnalign"></span>
                                                                                                    <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                                        v-model="uo.bcheck"
                                                                                                        density="compact"
                                                                                                        hide-details
                                                                                                        class="mt-0 pt-0 mr-2"
                                                                                                        @click.stop="choixMultiple(uo)"
                                                                                                    ></v-checkbox>
                                                                                                    <v-checkbox  v-else
                                                                                                        v-model="uo.bcheck"
                                                                                                        density="compact"
                                                                                                        hide-details
                                                                                                        class="mt-0 pt-0 mr-2"
                                                                                                        @click.stop="choix(uo)"
                                                                                                    ></v-checkbox>
                                                                                                    <v-tooltip :text="uo.description">
                                                                                                        <template v-slot:activator="{ props }">
                                                                                                            <v-btn
                                                                                                                v-bind:=props
                                                                                                                class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                                                size="small"
                                                                                                                variant="flat"
                                                                                                            >
                                                                                                                {{ uo.nom }}
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
                                                                                                                    v-model="uo.bcheck"
                                                                                                                    density="compact"
                                                                                                                    hide-details
                                                                                                                    class="mt-0 pt-0 mr-2"
                                                                                                                    @click.stop="choixMultiple(uo)"
                                                                                                                ></v-checkbox>
                                                                                                                <v-checkbox v-else
                                                                                                                    v-model="uo.bcheck"
                                                                                                                    density="compact"
                                                                                                                    hide-details
                                                                                                                    class="mt-0 pt-0 mr-2"
                                                                                                                    @click.stop="choix(uo)"
                                                                                                                ></v-checkbox>
                                                                                                                <v-tooltip :text="uo.description">
                                                                                                                    <template v-slot:activator="{ props }">
                                                                                                                        <v-btn
                                                                                                                            v-bind:=props
                                                                                                                            class="text-none text-subtitle-1"
                                                                                                                            size="small"
                                                                                                                            variant="flat"
                                                                                                                        >
                                                                                                                            {{ uo.nom }}
                                                                                                                        </v-btn>
                                                                                                                    </template>
                                                                                                                </v-tooltip>
                                                                                                            </div>                                                
                                                                                                        </v-expansion-panel-title>
                                                                                                        <v-expansion-panel-text>
                                                                                                            <!-- Niveau 5 -->
                                                                                                            <div v-for="(uo, index) in uo.enfants" :key="uo.id">
                                                                                                                <div v-if="uo.enfants.length === 0">
                                                                                                                    <div class="d-flex align-center">
                                                                                                                        <span class="spnalign"></span>
                                                                                                                        <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                                                            v-model="uo.bcheck"
                                                                                                                            density="compact"
                                                                                                                            hide-details
                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                            @click.stop="choixMultiple(uo)"
                                                                                                                        ></v-checkbox>
                                                                                                                        <v-checkbox  v-else
                                                                                                                            v-model="uo.bcheck"
                                                                                                                            density="compact"
                                                                                                                            hide-details
                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                            @click.stop="choix(uo)"
                                                                                                                        ></v-checkbox>
                                                                                                                        <v-tooltip :text="uo.description">
                                                                                                                            <template v-slot:activator="{ props }">
                                                                                                                                <v-btn
                                                                                                                                    v-bind:=props
                                                                                                                                    class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                                                                    size="small"
                                                                                                                                    variant="flat"
                                                                                                                                >
                                                                                                                                    {{ uo.nom }}
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
                                                                                                                                        v-model="uo.bcheck"
                                                                                                                                        density="compact"
                                                                                                                                        hide-details
                                                                                                                                        class="mt-0 pt-0 mr-2"
                                                                                                                                        @click.stop="choixMultiple(uo)"
                                                                                                                                    ></v-checkbox>
                                                                                                                                    <v-checkbox v-else
                                                                                                                                        v-model="uo.bcheck"
                                                                                                                                        density="compact"
                                                                                                                                        hide-details
                                                                                                                                        class="mt-0 pt-0 mr-2"
                                                                                                                                        @click.stop="choix(uo)"
                                                                                                                                    ></v-checkbox>
                                                                                                                                    <v-tooltip :text="uo.description">
                                                                                                                                        <template v-slot:activator="{ props }">
                                                                                                                                            <v-btn
                                                                                                                                                v-bind:=props
                                                                                                                                                class="text-none text-subtitle-1"
                                                                                                                                                size="small"
                                                                                                                                                variant="flat"
                                                                                                                                            >
                                                                                                                                                {{ uo.nom }}
                                                                                                                                            </v-btn>
                                                                                                                                        </template>
                                                                                                                                    </v-tooltip>
                                                                                                                                </div>                                                
                                                                                                                            </v-expansion-panel-title>
                                                                                                                            <v-expansion-panel-text>
                                                                                                                                <!-- Niveau 6 -->
                                                                                                                                <div v-for="(uo, index) in uo.enfants" :key="uo.id">
                                                                                                                                    <div v-if="uo.enfants.length === 0">
                                                                                                                                        <div class="d-flex align-center">
                                                                                                                                            <span class="spnalign"></span>
                                                                                                                                            <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                                                                                v-model="uo.bcheck"
                                                                                                                                                density="compact"
                                                                                                                                                hide-details
                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                @click.stop="choixMultiple(uo)"
                                                                                                                                            ></v-checkbox>
                                                                                                                                            <v-checkbox  v-else
                                                                                                                                                v-model="uo.bcheck"
                                                                                                                                                density="compact"
                                                                                                                                                hide-details
                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                @click.stop="choix(uo)"
                                                                                                                                            ></v-checkbox>
                                                                                                                                            <v-tooltip :text="uo.description">
                                                                                                                                                <template v-slot:activator="{ props }">
                                                                                                                                                    <v-btn
                                                                                                                                                        v-bind:=props
                                                                                                                                                        class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                                                                                        size="small"
                                                                                                                                                        variant="flat"
                                                                                                                                                    >
                                                                                                                                                        {{ uo.nom }}
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
                                                                                                                                                            v-model="uo.bcheck"
                                                                                                                                                            density="compact"
                                                                                                                                                            hide-details
                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                            @click.stop="choixMultiple(uo)"
                                                                                                                                                        ></v-checkbox>
                                                                                                                                                        <v-checkbox v-else
                                                                                                                                                            v-model="uo.bcheck"
                                                                                                                                                            density="compact"
                                                                                                                                                            hide-details
                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                            @click.stop="choix(uo)"
                                                                                                                                                        ></v-checkbox>
                                                                                                                                                        <v-tooltip :text="uo.description">
                                                                                                                                                            <template v-slot:activator="{ props }">
                                                                                                                                                                <v-btn
                                                                                                                                                                    v-bind:=props
                                                                                                                                                                    class="text-none text-subtitle-1"
                                                                                                                                                                    size="small"
                                                                                                                                                                    variant="flat"
                                                                                                                                                                >
                                                                                                                                                                    {{ uo.nom }}
                                                                                                                                                                </v-btn>
                                                                                                                                                            </template>
                                                                                                                                                        </v-tooltip>
                                                                                                                                                    </div>                                                
                                                                                                                                                </v-expansion-panel-title>
                                                                                                                                                <v-expansion-panel-text>
                                                                                                                                                <!-- Niveau 7 -->
                                                                                                                                                <div v-for="(uo, index) in uo.enfants" :key="uo.id">
                                                                                                                                                    <div v-if="uo.enfants.length === 0">
                                                                                                                                                        <div class="d-flex align-center">
                                                                                                                                                            <span class="spnalign"></span>
                                                                                                                                                            <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                                                                                                v-model="uo.bcheck"
                                                                                                                                                                density="compact"
                                                                                                                                                                hide-details
                                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                                @click.stop="choixMultiple(uo)"
                                                                                                                                                            ></v-checkbox>
                                                                                                                                                            <v-checkbox  v-else
                                                                                                                                                                v-model="uo.bcheck"
                                                                                                                                                                density="compact"
                                                                                                                                                                hide-details
                                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                                @click.stop="choix(uo)"
                                                                                                                                                            ></v-checkbox>
                                                                                                                                                            <v-tooltip :text="uo.description">
                                                                                                                                                                <template v-slot:activator="{ props }">
                                                                                                                                                                    <v-btn
                                                                                                                                                                        v-bind:=props
                                                                                                                                                                        class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                                                                                                        size="small"
                                                                                                                                                                        variant="flat"
                                                                                                                                                                    >
                                                                                                                                                                        {{ uo.nom }}
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
                                                                                                                                                                            v-model="uo.bcheck"
                                                                                                                                                                            density="compact"
                                                                                                                                                                            hide-details
                                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                                            @click.stop="choixMultiple(uo)"
                                                                                                                                                                        ></v-checkbox>
                                                                                                                                                                        <v-checkbox v-else
                                                                                                                                                                            v-model="uo.bcheck"
                                                                                                                                                                            density="compact"
                                                                                                                                                                            hide-details
                                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                                            @click.stop="choix(uo)"
                                                                                                                                                                        ></v-checkbox>
                                                                                                                                                                        <v-tooltip :text="uo.description">
                                                                                                                                                                            <template v-slot:activator="{ props }">
                                                                                                                                                                                <v-btn
                                                                                                                                                                                    v-bind:=props
                                                                                                                                                                                    class="text-none text-subtitle-1"
                                                                                                                                                                                    size="small"
                                                                                                                                                                                    variant="flat"
                                                                                                                                                                                >
                                                                                                                                                                                    {{ uo.nom }}
                                                                                                                                                                                </v-btn>
                                                                                                                                                                            </template>
                                                                                                                                                                        </v-tooltip>
                                                                                                                                                                    </div>                                                
                                                                                                                                                                </v-expansion-panel-title>
                                                                                                                                                                <v-expansion-panel-text>
                                                                                                                                                                <!-- Niveau 8 -->
                                                                                                                                                                <div v-for="(uo, index) in uo.enfants" :key="uo.id">
                                                                                                                                                                    <div v-if="uo.enfants.length === 0">
                                                                                                                                                                        <div class="d-flex align-center">
                                                                                                                                                                            <span class="spnalign"></span>
                                                                                                                                                                            <v-checkbox  v-if="modeChoix=='multiple'"
                                                                                                                                                                                v-model="uo.bcheck"
                                                                                                                                                                                density="compact"
                                                                                                                                                                                hide-details
                                                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                                                @click.stop="choixMultiple(uo)"
                                                                                                                                                                            ></v-checkbox>
                                                                                                                                                                            <v-checkbox  v-else
                                                                                                                                                                                v-model="uo.bcheck"
                                                                                                                                                                                density="compact"
                                                                                                                                                                                hide-details
                                                                                                                                                                                class="mt-0 pt-0 mr-2"
                                                                                                                                                                                @click.stop="choix(uo)"
                                                                                                                                                                            ></v-checkbox>
                                                                                                                                                                            <v-tooltip :text="uo.description">
                                                                                                                                                                                <template v-slot:activator="{ props }">
                                                                                                                                                                                    <v-btn
                                                                                                                                                                                        v-bind:=props
                                                                                                                                                                                        class="text-none text-subtitle-1 text-medium-emphasis"
                                                                                                                                                                                        size="small"
                                                                                                                                                                                        variant="flat"
                                                                                                                                                                                    >
                                                                                                                                                                                        {{ uo.nom }}
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
                                                                                                                                                                                            v-model="uo.bcheck"
                                                                                                                                                                                            density="compact"
                                                                                                                                                                                            hide-details
                                                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                                                            @click.stop="choixMultiple(uo)"
                                                                                                                                                                                        ></v-checkbox>
                                                                                                                                                                                        <v-checkbox v-else
                                                                                                                                                                                            v-model="uo.bcheck"
                                                                                                                                                                                            density="compact"
                                                                                                                                                                                            hide-details
                                                                                                                                                                                            class="mt-0 pt-0 mr-2"
                                                                                                                                                                                            @click.stop="choix(uo)"
                                                                                                                                                                                        ></v-checkbox>
                                                                                                                                                                                        <v-tooltip :text="uo.description">
                                                                                                                                                                                            <template v-slot:activator="{ props }">
                                                                                                                                                                                                <v-btn
                                                                                                                                                                                                    v-bind:=props
                                                                                                                                                                                                    class="text-none text-subtitle-1"
                                                                                                                                                                                                    size="small"
                                                                                                                                                                                                    variant="flat"
                                                                                                                                                                                                >
                                                                                                                                                                                                    {{ uo.nom }}
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
    </v-container></template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getUnitesOrgListe } from '@/axioscalls.js'
import type { UniteOrg }  from '@/axioscalls.js'

interface Props {
  modeChoix?: string
  uniteHorsVdL?: boolean  // Optionnel et de type booléen
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
  uniteHorsVdL: false  // Valeur par défaut à false
})
const modeChoix = ref<string>(props.modeChoix)
watch(() => props.modeChoix, (newValue) => {
  modeChoix.value = newValue
})

const buniteHorVdL = ref<boolean>(props.uniteHorsVdL)
watch(() => props.uniteHorsVdL, (newValue) => {
  buniteHorVdL.value = newValue
})

const unitesOrgListe: UnitesOrg = await getUnitesOrgListe()
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
    const buildTreeRecursive = (parentId: number | null): UniteOrgTree[] => {
        // Filtrer les unités organisationnelles qui ont le parentId donné
        const childrenUnites = unitesOrgListe.filter(
            uniteOrg => uniteOrg.iduoparente === parentId
        )

        // Transformer chaque unité enfant en noeud d'arbre
        return childrenUnites.map(uniteOrg => {
            const treeNode = createTreeNode(uniteOrg)
            
            // Récursivement ajouter les enfants
            treeNode.enfants = buildTreeRecursive(uniteOrg.iduniteorg)
            
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