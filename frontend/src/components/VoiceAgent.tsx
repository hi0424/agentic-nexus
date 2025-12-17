import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AIAvatar } from './AIAvatar'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react'

interface Message {
  id: string
  role: 'agent' | 'user'
  content: string
  timestamp: string
  type?: 'info' | 'urgent' | 'decision'
}

interface DecisionTrace {
  summary: string
  risk: string
  recommendation: string
  agents: string[]
}

export function VoiceAgent({
  selectedVehicle,
}: {
  selectedVehicle?: {
    id: string
    healthScore: number
    run: any
  }
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [decision, setDecision] = useState<DecisionTrace | null>(null)
  const [input, setInput] = useState('')
  const [voice, setVoice] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  /* ===============================
     CORE INTELLIGENCE
  =============================== */
  useEffect(() => {
    if (!selectedVehicle) {
      setMessages([
        {
          id: 'no-vehicle',
          role: 'agent',
          type: 'info',
          content:
            'Please select a vehicle from the dashboard to begin analysis.',
          timestamp: now(),
        },
      ])
      setDecision(null)
      return
    }

    const run = selectedVehicle.run || {}
    const diagnosis = run.diagnosis
    const health = selectedVehicle.healthScore

    let severity: 'info' | 'urgent' = 'info'
    if (health < 45 || diagnosis?.priority === 'HIGH') severity = 'urgent'

    const intro: Message = {
      id: 'intro',
      role: 'agent',
      type: severity,
      content: `Vehicle ${selectedVehicle.id} analysis complete.

Current Health Score: ${health}%.

${
  severity === 'urgent'
    ? '⚠️ Immediate attention recommended to avoid breakdown or downtime.'
    : 'Vehicle is operational, but early wear indicators are present.'
}`,
      timestamp: now(),
    }

    const decisionTrace: DecisionTrace = {
      summary:
        diagnosis?.failure ??
        'No critical failure detected at this time.',
      risk:
        severity === 'urgent'
          ? 'High probability of failure within the next operational window.'
          : 'Gradual degradation expected over time.',
      recommendation:
        severity === 'urgent'
          ? 'Schedule service within the next 72 hours.'
          : 'Monitor vehicle and set a preventive maintenance reminder.',
      agents: [
        'Diagnosis Agent',
        'Scheduling Agent',
        'UEBA Monitor',
        diagnosis?.priority ? 'Manufacturing Feedback Agent' : '',
      ].filter(Boolean),
    }

    const action: Message = {
      id: 'decision',
      role: 'agent',
      type: 'decision',
      content: decisionTrace.recommendation,
      timestamp: now(),
    }

    setMessages([intro, action])
    setDecision(decisionTrace)
  }, [selectedVehicle?.id])

  /* ===============================
     USER CHAT
  =============================== */
  const sendMessage = () => {
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        content: input,
        timestamp: now(),
      },
      {
        id: `${Date.now()}-agent`,
        role: 'agent',
        type: 'info',
        content:
          'Understood. Re-evaluating risk and coordinating with internal agents.',
        timestamp: now(),
      },
    ])

    setInput('')
  }

  /* ===============================
     UI
  =============================== */
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

        {/* AVATAR */}
        <Card className="p-8 bg-card/50 border-border/50">
          <div className="flex flex-col items-center gap-6">
            <AIAvatar isActive={voice || speaking} />
            <h3 className="text-primary">Autonomous Service Agent</h3>

            <div className="flex gap-2 w-full">
              <Button onClick={() => setVoice(!voice)} className="flex-1">
                {voice ? <Mic /> : <MicOff />}
              </Button>
              <Button onClick={() => setSpeaking(!speaking)} className="flex-1">
                {speaking ? <Volume2 /> : <VolumeX />}
              </Button>
            </div>
          </div>
        </Card>

        {/* CHAT */}
        <Card className="lg:col-span-2 p-6 bg-card/50 flex flex-col h-[680px]">
          <div className="flex-1 overflow-y-auto space-y-4">
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      m.type === 'urgent'
                        ? 'bg-accent/30 border border-accent'
                        : m.type === 'decision'
                        ? 'bg-secondary/20 border border-secondary'
                        : 'bg-muted/50'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{m.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {m.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {decision && (
              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/30">
                <h4 className="text-primary mb-2">
                  🧠 Decision Trace <Badge variant="outline">Explainable AI</Badge>
                </h4>
                <p className="text-xs mb-1">
                  <strong>Summary:</strong> {decision.summary}
                </p>
                <p className="text-xs mb-1">
                  <strong>Risk:</strong> {decision.risk}
                </p>
                <p className="text-xs mb-1">
                  <strong>Recommendation:</strong> {decision.recommendation}
                </p>
                <p className="text-xs">
                  <strong>Agents Involved:</strong>{' '}
                  {decision.agents.join(', ')}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask why, what if, or next steps…"
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage}>
              <Send />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function now() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}