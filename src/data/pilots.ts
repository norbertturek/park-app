export type Pilot = {
  name: string
  brams: { name: string }[]
}

const pilots: Pilot[] = [
  {
    name: 'Pilot 1',
    brams: [
      { name: 'Szlaban Grzybowska 1' },
      { name: 'Szlaban Grzybowska 2' },
      { name: 'Szlaban Grzybowska 3' },
    ],
  },
  {
    name: 'Pilot 2',
    brams: [
      { name: 'Brama Wyjazdowa Śląska 1' },
      { name: 'Brama Wyjazdowa Śląska 2' },
      { name: 'Szlaban Grzybowska 3' },
    ],
  },
  {
    name: 'Pilot 3',
    brams: [
      { name: 'Brama garażowa 1' },
      { name: 'Brama garażowa 2' },
      { name: 'Brama garażowa 3' },
    ],
  },
]

export default pilots
