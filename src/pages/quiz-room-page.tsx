import qs, {IQuestion} from "@/lib/questions/php";

import {RiTerminalLine} from "react-icons/ri";
import {AnimatePresence, motion} from "framer-motion";
import {buttonVariants} from "@/components/ui/button.tsx";
import Markdown from "react-markdown";
import {useEffect, useState} from "react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {wrap} from "popmotion";
import {cn} from "@/lib/utils.ts";

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};


function QuizRoomPage() {
    const [[page, direction], setPage] = useState([0, 0]);
    const [questions, setQuestions] = useState<IQuestion[]>([]);

    const index = wrap(0, questions.length, page);
    useEffect(() => {
        setQuestions(qs.sort(() => Math.random() - 0.5).slice(0, 10));
    }, [])

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const question = questions[index];


    return <div className="">
        <div className="flex items-center h-16 w-full ">
            <div className="max-w-screen-lg mx-auto px-6 flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <RiTerminalLine className="h-6 w-6"/>
                    <span>room</span>
                </div>
                <div className="flex gap-4 select-none">
                    <motion.button className={cn(buttonVariants(), 'bg-brand-600 hover:bg-brand-700 px-4 rounded-full')}
                                   whileTap={{scale: 0.95}}>SUBMIT
                    </motion.button>
                </div>
            </div>
        </div>

        <div>
            <div className="max-w-screen-lg  mx-auto px-3">
                {question && <div className="p-4">
                    <div>
                        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                            <motion.div layout className="flex items-center justify-between pb-4">
                                <div>
                                    <div className="font-bold text-lg"><span
                                        className="text-brand-600">{index + 1}</span> / {questions.length}</div>
                                </div>
                                <div className="flex gap-3">
                                    <motion.button
                                        onClick={() => paginate(-1)}
                                        whileTap={{scale: 0.95}}
                                        className="select-none p-2 hover:bg-gray-100 rounded-full flex items-center justify-center">
                                        <LuChevronLeft className="h-6 w-6"/>
                                    </motion.button>
                                    <motion.button
                                        onClick={() => paginate(1)}
                                        whileTap={{scale: 0.95}}
                                        className="select-none p-2 hover:bg-gray-100 gap-1 rounded-full flex items-center justify-center">
                                        <span className="inline-block pl-4">Next</span>
                                        <LuChevronRight className="h-6 w-6"/>
                                    </motion.button>
                                </div>
                            </motion.div>
                            <motion.div
                                layout
                                key={page}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: {type: "spring", stiffness: 300, damping: 30},
                                    opacity: {duration: 0.2}
                                }}
                                drag="x"
                                dragConstraints={{left: 0, right: 0}}
                                dragElastic={1}
                                onDragEnd={(_, {offset, velocity}) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className="space-y-4"
                            >
                                <Markdown className="text-2xl">{question?.question}</Markdown>
                                <div className="py-5 space-y-2">
                                    {question?.options.map((option, index) => (
                                        <label htmlFor={index.toString()} key={option.label}
                                               className="flex  gap-2 cursor-pointer hover:bg-gray-100 py-2 px-3 rounded">
                                            <div className="pt-0.5">
                                                <input name="answer" id={index.toString()} type="radio"
                                                       className="h-4 w-4 accent-brand-600"/>
                                            </div>
                                            <div className="font-bold">
                                                {['A', 'B', 'C', 'D'][index]}.
                                            </div>
                                            <div>
                                                <Markdown>{option.label}</Markdown>
                                            </div>
                                        </label>))
                                    }
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>}
            </div>
        </div>
    </div>
}

export default QuizRoomPage