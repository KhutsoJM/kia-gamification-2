import { motion } from "framer-motion";

const levelCategories = [
    {
        name: "Basic Maths",
        description: "Explore the great forest and discover nature words!",
        image: "🌲",
        bgColor: "bg-green-400",
    },
    {
        name: "BODMAS",
        description: "Navigate the busy city and learn urban vocabulary!",
        image: "🌆",
        bgColor: "bg-blue-400",
    },
    {
        name: "Space Odyssey",
        description: "Blast off to space and explore cosmic words!",
        image: "☄️",
        bgColor: "bg-slate-400",
    }
]

const CategorySelection = ({onStart}) => {
    return (
        <>
            <h1 className="text-6xl mb-8 font-bold text-slate-800">
                Choose Your Adventure
            </h1>
            <p className="text-2xl mb-8 text-slate-500 font-medium">
                Select a world to explore and discover new words!
            </p>
            <div className="flex flex-row space-x-8">
                {levelCategories.map(category => (
                    <motion.div
                        key={category.name}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                            duration: 0.15,
                            ease: "easeOut"
                        }}
                        className="flex flex-col w-72 cursor-pointer"
                        onClick={onStart}
                    >
                        <div className={`flex flex-col p-4 ${category.bgColor} rounded-t-4xl`}>
                            <span className="text-6xl text-center mb-6">{category.image}</span>
                            <h2 className="text-3xl text-center font-semibold text-white mb-3">{category.name}</h2>
                            <p className="text-white text-center">
                                {category.description}
                            </p>
                        </div>
                        <div className="flex flex-col py-6 px-6 bg-white rounded-b-4xl">
                            <div className="flex flex-row justify-between mb-4">
                                <p className="text-md text-slate-700 font-semibold">Progress</p>
                                <span className="text-md text-green-400 font-semibold">0/5</span>
                            </div>
                            <div className="text-center text-blue-500 mb-4">Progress bar goes here</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    )
}

export default CategorySelection;
