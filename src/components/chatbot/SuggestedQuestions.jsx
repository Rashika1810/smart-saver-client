export default function SuggestedQuestions({ questions, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="
            px-3
            py-1.5
            rounded-full
            border
            border-gray-200
            bg-white
            text-sm
            font-medium
            text-gray-700
            whitespace-nowrap
            hover:bg-blue-50
            hover:border-blue-200
            hover:text-blue-700
            transition-colors
            duration-200
          "
        >
          {question}
        </button>
      ))}
    </div>
  );
}
