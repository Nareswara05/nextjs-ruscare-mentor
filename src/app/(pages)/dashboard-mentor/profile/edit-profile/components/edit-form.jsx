
function EditForm({label, value, onChange, placeholder, type, error}) {
    return (
        <div className="flex flex-col  w-full items-start">
            <h2 className="text-primaryText text-sm lg:text-lg mb-2 font-semibold  text-textPrimary">{label}</h2>
            <input
                className="w-full border-2 bg-[#F6F8FA] px-2 py-3 border-[#E5E5E5] rounded-lg focus:outline-none text-textPrimary lg:text-md"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                required
            />
            {error && <p className="error text-red-600">{error}</p>}
        </div>

    );
}

export default EditForm;