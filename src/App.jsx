import { useEffect, useState } from "react"

const App = () => {
  const [loading, setLoading] = useState(true)
  const [operatorList, setOperatorList] = useState([])
  const [operatorKeys, setOperatorKeys] = useState([])
  const [operatorInformation, setOperatorInformation] = useState([])
  const [filter, setFilter] = useState({
    rarity: 0,
    class: '',
    tags: [],
  })

  const classes = ['Vanguard', 'Guard', 'Defender', 'Sniper', 'Caster', 'Medic', 'Supporter', 'Specialist']
  const tags = ['Crowd-Control', 'Nuker', 'Healing', 'Support', 'DP-Recovery', 'DPS', 'Survival', 'AoE', 'Defense',
                'Slow', 'Debuff', 'Fast-Redeploy', 'Shift', 'Summon', 'Robot', 'Elemental']
  const rarities = [1,2,3,4,5,6]

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
        .then(json => {
          // Modify json data for filter logic
          const op = json[0].value.data
          const job = op.profession
          return {
            name: op.name,
            class: 
              job === 'PIONEER' ? 'Vanguard' 
              : job === 'WARRIOR' ? 'Guard'
              : job === 'TANK' ? 'Defender'
              : job === 'SUPPORT' ? 'Supporter'
              : job === 'SPECIAL' ? 'Specialist'
              : job.charAt(0) + job.slice(1).toLowerCase(),
            rarity: Number(op.rarity.at(-1)),
            tags: op.tagList,
          }
        })
    )

    Promise.all(fetches).then(results => {
      // console.log(results)
      setOperatorInformation(results)
    }).finally(() => setLoading(false))
  }, [operatorKeys])

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

  function operatorSort(a, b) {
    if (a.rarity < b.rarity) {
      return 1
    }
    if (a.rarity > b.rarity) {
      return -1
    }

    return 0
  }

  useEffect(() => {
    if (filter.rarity === 0 && filter.class === '' && filter.tags.length === 0) {
      setOperatorList([])
    } else {
      const filtered = operatorInformation.filter(op => {
        const matchClass = filter.class === '' || op.class === filter.class
        const matchRarity = filter.rarity === 0 || op.rarity === filter.rarity
        const matchTags = filter.tags.length === 0 || filter.tags.every(t => op.tags.includes(t))
        
        // console.log(typeof op.rarity, typeof filter.rarity, matchRarity)
        return matchClass && matchRarity && matchTags
      })

      filtered.map((op) => 
        ({
          name: op.name,
          rarity: op.rarity,
          tags: op.tagList
        }
      ))

      filtered.sort(operatorSort)

      setOperatorList(filtered)
    }
  }, [filter])

  if (loading) return (<h1 className="mx-auto text-6xl">Loading...</h1>)

  return(
    <div className="flex flex-col min-h-screen">
      <h1 className="text-5xl mx-auto py-6">Recruitment Calculator</h1>
      <div className="mx-10 px-6 py-4 bg-gray-800 shadow-2xl">
        { /* Class Filter */}
        <h2 className="text-xl">Classes</h2>
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
        <h2 className="text-xl pt-4">Rarity</h2>
        <div className="flex pt-1 gap-2">
          {rarities.map((r, index) => {
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
        <h2 className="text-xl pt-4">Tags</h2>
        <div className="flex pt-1 gap-2">
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
      
        <ul className="grid grid-cols-10 gap-2 mx-auto mb-8 mt-4">
          {operatorList.map((operator, index) => {
            // Add a color background based on rarity and try to use API for images?
            return(
              <li 
                key={index}
                className={`w-full text-center my-2 text-black ${
                  operator.rarity === 1 ? 'bg-stone-400' :
                  operator.rarity === 2 ? 'bg-lime-300' :
                  operator.rarity === 3 ? 'bg-blue-500' :
                  operator.rarity === 4 ? 'bg-indigo-400' :
                  operator.rarity === 5 ? 'bg-amber-200' :
                  operator.rarity === 6 ? 'bg-orange-400' : ''
                }`}
              >
                <h2 className="my-4">{operator.name}</h2>
              </li>
            )
          })}
        </ul>
        <button
          className="mx-auto p-3 w-fit"
          onClick={() => setFilter({rarity: 0, class: '', tags: [],})}
        >
          Clear Tags
        </button>
      </div>
    </div>
  )
}

export default App
