/**
 * Launch Wizard
 * 
 * First-run setup wizard for personalizing the template.
 * Collects project info and app description, generates build spec.
 * 
 * Development only. Self-destructs after use.
 */

'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CheckIcon, ClipboardIcon, RocketIcon, SparklesIcon } from '@/components/Icons'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type FormData = {
  projectName: string
  tagline: string
  githubUrl: string
  authorName: string
  authorUrl: string
  appDescription: string
}

type LaunchResult = {
  filesModified: string[]
  cursorPrompt: string
}

type Step = 1 | 2 | 3

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const INITIAL_FORM: FormData = {
  projectName: '',
  tagline: '',
  githubUrl: '',
  authorName: '',
  authorUrl: '',
  appDescription: '',
}

const MIN_DESCRIPTION_LENGTH = 20
const COPY_FEEDBACK_DURATION = 2000

const DESCRIPTION_PLACEHOLDER = `Example: I want to build a task management app where users can:
- Create projects and organize tasks within them
- Add tasks with titles, descriptions, due dates, and priorities
- Mark tasks as complete and filter by status
- See a dashboard with statistics

Each user should only see their own data. Clean, minimal interface.`

// -----------------------------------------------------------------------------
// Subcomponents
// -----------------------------------------------------------------------------

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {([1, 2, 3] as const).map((step) => (
        <div key={step} className={`flex items-center ${step < 3 ? 'flex-1' : ''}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              step === current
                ? 'bg-primary text-primary-foreground'
                : step < current
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {step < current ? <CheckIcon className="w-4 h-4" /> : step}
          </div>
          {step < 3 && (
            <div
              className={`flex-1 h-0.5 mx-2 transition-colors ${
                step < current ? 'bg-primary/40' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function FormField({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && ' *'}
      </Label>
      {children}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export default function LaunchPage() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<LaunchResult | null>(null)
  const [copied, setCopied] = useState(false)

  const canProceedStep1 = form.projectName.trim() && form.tagline.trim()
  const canProceedStep2 = form.appDescription.trim().length >= MIN_DESCRIPTION_LENGTH

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleGenerate = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      setResult(data)
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [form])

  const handleCopy = useCallback(async () => {
    if (!result?.cursorPrompt) return

    try {
      await navigator.clipboard.writeText(result.cursorPrompt)
    } catch {
      const el = document.createElement('textarea')
      el.value = result.cursorPrompt
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }

    setCopied(true)
    setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION)
  }, [result?.cursorPrompt])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <RocketIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Launch Your App</h1>
          <p className="text-muted-foreground">
            Personalize this template and let Cursor build your idea
          </p>
        </header>

        <StepIndicator current={step} />

        {/* Step 1: Project Info */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <h2 className="font-semibold text-lg">Project Details</h2>

              <FormField id="projectName" label="Project Name" required>
                <Input
                  id="projectName"
                  placeholder="TaskFlow"
                  value={form.projectName}
                  onChange={e => updateField('projectName', e.target.value)}
                  autoFocus
                />
              </FormField>

              <FormField id="tagline" label="Tagline" required>
                <Input
                  id="tagline"
                  placeholder="Simple task management for teams"
                  value={form.tagline}
                  onChange={e => updateField('tagline', e.target.value)}
                />
              </FormField>

              <FormField id="githubUrl" label="GitHub URL (optional)">
                <Input
                  id="githubUrl"
                  placeholder="https://github.com/you/repo"
                  value={form.githubUrl}
                  onChange={e => updateField('githubUrl', e.target.value)}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField id="authorName" label="Author (optional)">
                  <Input
                    id="authorName"
                    placeholder="Your Name"
                    value={form.authorName}
                    onChange={e => updateField('authorName', e.target.value)}
                  />
                </FormField>
                <FormField id="authorUrl" label="Author URL (optional)">
                  <Input
                    id="authorUrl"
                    placeholder="https://yoursite.com"
                    value={form.authorUrl}
                    onChange={e => updateField('authorUrl', e.target.value)}
                  />
                </FormField>
              </div>
            </div>

            <div className="flex justify-end">
              <Button size="lg" onClick={() => setStep(2)} disabled={!canProceedStep1}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: App Description */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Describe Your App</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Be specific about features and data. More detail = better results.
                  </p>
                </div>
              </div>

              <FormField id="appDescription" label="What do you want to build?">
                <Textarea
                  id="appDescription"
                  placeholder={DESCRIPTION_PLACEHOLDER}
                  className="min-h-[200px] resize-none"
                  value={form.appDescription}
                  onChange={e => updateField('appDescription', e.target.value)}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {form.appDescription.length} characters
                  {form.appDescription.length < MIN_DESCRIPTION_LENGTH &&
                    ` (minimum ${MIN_DESCRIPTION_LENGTH})`}
                </p>
              </FormField>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={!canProceedStep2 || isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Build Plan'}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && result && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                  <CheckIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Ready to Build!</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Copy the prompt below and paste it into Cursor.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Files Modified</Label>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  {result.filesModified.map(file => (
                    <li key={file} className="flex items-center gap-2">
                      <CheckIcon className="w-3 h-3 text-green-500" />
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{file}</code>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <Label>Cursor Prompt</Label>
                <div className="relative">
                  <pre className="bg-muted rounded-lg p-4 text-sm whitespace-pre-wrap overflow-auto max-h-[300px]">
                    {result.cursorPrompt}
                  </pre>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <CheckIcon className="w-3 h-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="font-semibold mb-2">Next Steps</h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>
                  Press{' '}
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">Cmd+L</kbd>{' '}
                  to open Cursor chat
                </li>
                <li>Paste the prompt and press Enter</li>
                <li>Cursor will clean up template files and build your app!</li>
              </ol>
              <p className="text-xs text-muted-foreground mt-4">
                The prompt includes instructions to remove this wizard and other template files.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
