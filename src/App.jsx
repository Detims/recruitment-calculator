import { useEffect, useState } from "react"

const App = () => {
  const [operatorList, setOperatorList] = useState([])
  const [operatorKeys, setOperatorKeys] = useState([])
  const [operatorInformation, setOperatorInformation] = useState([])
  const [filter, setFilter] = useState({
    rarity: 0,
    class: '',
    tags: [],
  })

  useEffect(() => {
    fetch('https://awedtan.ca/api/recruitpool')
      .then(res => res.json())
      .then(json => {
        console.log(json[0].value)
        setOperatorKeys(json[0].value)
      })
  }, [])

  useEffect(() => {
    if (operatorKeys.length === 0) return

    const fetches = operatorKeys.map(key => 
      fetch(`https://awedtan.ca/api/operator/searchV2?filter={"id":"${key}"}&include=data.name&include=data.profession&include=data.rarity&include=data.tagList`)
        .then(res => res.json())
        .then(json => json[0].value.data)
    )

    Promise.all(fetches).then(results => {
      console.log(results)
      setOperatorInformation(results)
    })

    // operatorKeys.forEach((key) => {
    //       // Finish this part
    //       // fetch(`https://awedtan.ca/api/operator/match/${key}&include=data.name&include=data.rarity&include=data.tagList`)
    //         fetch(`https://awedtan.ca/api/operator/searchV2?filter={"id":"${key}"}`)
    //         .then(res => res.json())
    //         .then(json => {
    //           console.log(json)
    //           // setOperatorInformation()
    //         })
    //     })
  }, [operatorKeys])

  const classes = ['Vanguard', 'Guard', 'Defender', 'Sniper', 'Caster', 'Medic', 'Supporter', 'Specialist']
  const tags = ['Crowd Control', 'Nuker', 'Healing', 'Support', 'DP-Recovery', 'DPS', 'Survival', 'AoE', 'Defense',
    'Slow', 'Debuff', 'Fast-Redeploy', 'Shift', 'Summon', 'Robot', 'Elemental'
  ]

  function updateClass(classType) {
    // Change class filter to different class, otherwise empty it
    setFilter(prev => ({
      ...prev,
      class: prev.class === classType ? '' : classType
    }))
  }

  function updateRarity(rarityNum) {
    setFilter(prev => ({
      ...prev,
      rarity: prev.rarity === rarityNum ? 0 : rarityNum
    }))
  }

  function updateTags(tag) {
    setFilter(prev => {
      const tagExists = prev.tags.includes(tag)
      let newTags

      if (tagExists) {
        newTags = prev.tags.filter(t => t !== tag)
      } else {
        newTags = [...prev.tags, tag]
      }

      return {
        ...prev,
        tags: newTags
      }
    })
  }

  useEffect(() => {
    if (filter.rarity === 0 && filter.class === '' && filter.tags.length === 0) {
      console.log('list is empty')
      setOperatorList([])
    } else {
      const filtered = operatorInformation.filter(op => {
        const matchClass = filter.class === '' || op.profession === filter.class
        const matchRarity = filter.rarity === 0 || Number(op.rarity.at(-1)) === filter.rarity
        const matchTags = filter.tags.length === 0 || filter.tags.every(t => op.tagList.includes(t))
        
        // console.log(typeof op.rarity, typeof filter.rarity, matchRarity)
        return matchClass && matchRarity && matchTags
      })

      setOperatorList(filtered.map((op) => 
      ({
        name: op.name,
        rarity: op.rarity,
        tags: op.tagList
      }
      )))
    }
  }, [filter])

  // Remove this later
  function updateOperatorList() {
    // Show nothing if there are no filters in place
    if (filter.rarity === 0 && filter.class === '' && filter.tags.length === 0) {
      console.log('list is empty')
      setOperatorList([])
    } else {
      setOperatorList(data.filter((op) => 
        filter.class === op.class).map((operator) => 
      ({
        name: operator.name,
        rarity: operator.rarity,
        tags: operator.tags
      }
      )))
    }
  }

  return(
    <div className="flex flex-col min-h-screen">
      <h1 className="text-5xl">Recruitment Calculator</h1>
      { /* Class Filter */}
      <h2>Classes</h2>
      <div className="flex gap-2">
        {classes.map((c, index) => {
          return(
            <button
              key={index}
              className={`w-fit p-3 ${filter.class === c ? 'selected' : ''}`}
              onClick={() => updateClass(c)}
            ><p className="text-sm">{c}</p></button>
          )
        })}
      </div>
      {/* Rarity Filter */}
      <h2>Rarity</h2>
      <div className="flex gap-2">
        {[1,2,3,4,5,6].map((r, index) => {
          return(
            <button
              key={index}
              className={`w-fit p-3 ${filter.rarity === r ? 'selected' : ''}`}
              onClick={() => updateRarity(r)}
            ><p className="text-sm">{r}</p></button>
          )
        })}
      </div>
      {/* Tag Filter */}
      <h2>Tags</h2>
      <div className="flex gap-2">
        {tags.map((t, index) => {
          return(
            <button
              key={index}
              className={`w-fit p-3 ${filter.tags.includes(t) ? 'selected' : ''}`}
              onClick={() => updateTags(t)}
            ><p className="text-sm">{t}</p></button>
          )
        })}
      </div>
      <ul className="grid grid-cols-10 gap-8 mx-auto mb-8">
        {operatorList.map((operator, index) => {
          return(
            <li 
              key={index}
              className="w-full"
            >
              <h2 className="mt-4">{operator.name}</h2>
            </li>
          )
        })}
      </ul>
      <button 
        className="w-fit mx-auto mt-8 p-4 rounded-2xl"
        onClick={updateOperatorList}
      >Refresh</button>
    </div>
  )
}

export default App
