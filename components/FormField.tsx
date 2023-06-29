type Props = {
  title: string;
  type?: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

const FormField = ({
  title,
  type,
  state,
  placeholder,
  isTextArea,
  setState,
}: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label htmlFor="" className="w-full text-gray-100">
        {title}
      </label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="form_field-input"
          required
        />
      ) : (
        <input
          type={type || 'text'}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="form_field-input"
          required
        />
      )}
    </div>
  );
};
export default FormField;
