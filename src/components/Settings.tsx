import CustomLabel from './CustomLabel'
import CustomSelect from './CustomSelect'
import { LEVELS, MODES } from '../lib/constants'

import { useConfig, useActions } from '../store/context'

export default function Settings() {
  const { level, mode } = useConfig()
  const { setLevel, setMode } = useActions()

  const configs = [
    {
      title: 'Difficulty',
      name: 'level',
      actual: level,
      options: LEVELS,
      onChange: setLevel,
    },
    {
      title: 'Mode',
      name: 'mode',
      actual: mode,
      options: MODES,
      onChange: setMode,
    },
  ]

  return (
    <div className="desktop flex items-center gap-8 max-[680px]:hidden max-lg:justify-between">
      {/* Desktop Version */}
      <div className="hidden items-center gap-8 min-[681px]:flex">
        {configs.map((config, index) => (
          <div key={config.name} className="flex items-center gap-8">
            <CustomLabel {...config} name={`desktop-${config.name}`} />
            {index === 0 && <div className="h-6 w-[1px] bg-neutral-700" />}
          </div>
        ))}
      </div>

      {/* Mobile Version */}
      <div className="flex gap-2 min-[681px]:hidden">
        {configs.map((config) => (
          <CustomSelect
            key={config.name}
            {...config}
            name={`mobile-${config.name}`}
          />
        ))}
      </div>
    </div>
  )
}
