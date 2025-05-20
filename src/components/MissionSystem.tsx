import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  objectives: string[];
  timeLimit?: number;
}

interface MissionSystemProps {
  onMissionComplete: (reward: number) => void;
}

const availableMissions: Mission[] = [
  {
    id: 'mission1',
    title: 'Assalto ao Banco Fleeca',
    description: 'Planeje e execute um assalto ao banco Fleeca. Reúna sua equipe e faça a fuga perfeita.',
    reward: 100000,
    objectives: [
      'Reconhecer o local',
      'Recrutar 2 membros da equipe',
      'Comprar equipamentos necessários',
      'Executar o assalto',
      'Fugir da polícia'
    ],
    timeLimit: 30
  },
  {
    id: 'mission2',
    title: 'Entrega de Contrabando',
    description: 'Faça a entrega de mercadorias ilegais em diferentes pontos da cidade.',
    reward: 50000,
    objectives: [
      'Pegar o veículo de entrega',
      'Fazer 3 entregas em tempo',
      'Evitar a polícia',
      'Retornar ao ponto inicial'
    ],
    timeLimit: 20
  },
  {
    id: 'mission3',
    title: 'Proteção de Território',
    description: 'Defenda seu território contra gangues rivais.',
    reward: 75000,
    objectives: [
      'Eliminar 5 membros da gangue rival',
      'Proteger 3 pontos estratégicos',
      'Manter o controle por 10 minutos'
    ],
    timeLimit: 15
  }
];

export function MissionSystem({ onMissionComplete }: MissionSystemProps) {
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [completedObjectives, setCompletedObjectives] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const startMission = (mission: Mission) => {
    setCurrentMission(mission);
    setCompletedObjectives([]);
    if (mission.timeLimit) {
      setTimeLeft(mission.timeLimit);
    }
  };

  const completeObjective = (objective: string) => {
    if (!currentMission) return;
    
    setCompletedObjectives(prev => [...prev, objective]);
    
    if (completedObjectives.length + 1 === currentMission.objectives.length) {
      onMissionComplete(currentMission.reward);
      setCurrentMission(null);
      setTimeLeft(null);
    }
  };

  return (
    <div className="fixed top-20 right-4 w-80 bg-black/90 rounded-lg p-4 z-50">
      <h2 className="text-xl font-bold text-yellow-500 mb-4">Missões Disponíveis</h2>
      
      <div className="space-y-4">
        {availableMissions.map(mission => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <h3 className="font-bold text-white mb-2">{mission.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{mission.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-yellow-500">Recompensa: ${mission.reward.toLocaleString()}</span>
              <button
                onClick={() => startMission(mission)}
                className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm hover:bg-yellow-600"
              >
                Iniciar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {currentMission && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-black/95 rounded-lg p-6 z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-yellow-500">{currentMission.title}</h3>
              {timeLeft !== null && (
                <div className="flex items-center text-yellow-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{timeLeft}s</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              {currentMission.objectives.map((objective, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {completedObjectives.includes(objective) ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-white">{objective}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setCurrentMission(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
              >
                Abandonar Missão
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 