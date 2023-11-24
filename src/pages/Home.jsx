import { motion } from 'framer-motion'
import Popluar from "../Components/Popluar"
import Veggie from "../Components/Veggie"

const Home = () => {
  return (
    <motion.div 
    animate={{opacity: 1}}
    initial= {{opacity: 0}}
    exit={{opacity: 0}}
    transition={{duration: 0.5}}
    >
      <Veggie />
      <Popluar />
    </motion.div>
  )
}

export default Home
