/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from 'react'
import NonGroup from '../../components/NonGroup'
import Group from '../../components/Group'

const Groups = () => {

  const [group] = useState(1)
  return (
    <>
 {group > 0 ? <Group /> :  <NonGroup />}    
    

    </>
  )
}

export default Groups