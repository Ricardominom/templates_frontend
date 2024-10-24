import { FieldErrors, UseFormRegister } from "react-hook-form"
import { QuestionFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type QuestionFormProps = {
    errors: FieldErrors<QuestionFormData>
    register: UseFormRegister<QuestionFormData>
}

export default function QuestionForm({errors, register} : QuestionFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="ask"
                >Ask</label>
                <input
                    id="ask"
                    type="text"
                    placeholder="Put your question here"
                    className="w-full p-3  border-gray-300 border dark:text-black"
                    {...register("ask", {
                        required: "Ask is required",
                    })}
                />
                {errors.ask && (
                    <ErrorMessage>{errors.ask.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="answer"
                >Answer</label>
                <textarea
                    id="answer"
                    placeholder="Put the answer here"
                    className="w-full p-3  border-gray-300 border dark:text-black"
                    {...register("answer", {
                        required: "Answer is required"
                    })}
                />
                {errors.answer && (
                    <ErrorMessage>{errors.answer.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}