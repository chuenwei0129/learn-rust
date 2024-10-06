import { match } from 'ts-pattern'
import { Basic } from './Basic'
import { Api } from './Api'
import { When } from './When'
import { Not } from './Not'
import { Select } from './Select'
import { Union } from './Union'
import { useState } from 'react'
import { SearchGif } from './SearchGif'
import Reducer from './Reducer'

const examples = [
  'basic',
  'api',
  'when',
  'not',
  'select',
  'union',
  'gif',
  'reducer',
] as const

type Example = (typeof examples)[number]

export default function App() {
  const [example, setExample] = useState<Example>('basic')

  return (
    <div className="container">
      <h2>
        {'Example: '}
        <select onChange={(e) => setExample(e.target.value as Example)}>
          {examples.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </h2>
      {match(example)
        .with('basic', () => <Basic />)
        .with('api', () => <Api />)
        .with('when', () => <When />)
        .with('not', () => <Not />)
        .with('select', () => <Select />)
        .with('union', () => <Union />)
        .with('gif', () => <SearchGif />)
        .with('reducer', () => <Reducer />)
        .exhaustive()}
    </div>
  )
}
