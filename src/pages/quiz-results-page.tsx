import Appbar from "@/components/appbar.tsx";
import {cn} from "@/lib/utils.ts";
import questions from "@/lib/questions/linux";
import Markdown from "react-markdown";


function QuizResultsPage() {


    return <div>
        <Appbar/>
        <div className="bg-brand-50 ">
            <div className="max-w-screen-lg relative pt-24 pb-6 mx-auto px-5">
                <i className={cn(" text-9xl text-brand-100 absolute right-4", "devicon-php-plain")}></i>
                <div className="relative z-10">
                    <p className="font-bold text-lg">Results</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl md:text-6xl font-bold py-4">
                                <span className="text-brand-600">9</span><span
                                className="text-2xl md:text-4xl">/10</span>
                            </h1>
                        </div>
                        <p className="font-bold text-2xl md:text-4xl">
                            <span>PHP</span>
                            <span className="font-normal">(HARD)</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div className="max-w-screen-lg  py-10 mx-auto px-3">
                <div className="pb-6">
                    <h1 className="relative text-2xl md:text-4xl font-bold py-4">
                        <span>Question Answers</span>
                        <div className="h-1 w-20 bg-brand-600 mx-1 mt-2"></div>
                    </h1>
                </div>
                <div className="divide-y">
                    {questions.map((question, index) => {
                        return <div key={index} className="py-4 px-4">
                            <div className="flex gap-3">
                                <div className="font-bold">{index + 1}.</div>
                                <div>
                                    <Markdown>{question.question}</Markdown>
                                </div>
                            </div>
                            <div className="pl-8 py-4">
                                {question.options.map((option, index) => {
                                    return <div>
                                        <div className="flex gap-3 space-y-0.5">
                                            <div className="font-bold">{['A', 'B', 'C', 'D'][index]}.</div>
                                            <div>
                                                <Markdown>{option.label}</Markdown>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default QuizResultsPage