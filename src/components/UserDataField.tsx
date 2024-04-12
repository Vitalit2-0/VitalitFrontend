
function UserDataField({ title, value } : { title: string, value: string }) {
    return (
        <div className="p-5 w-full flex mb-2 justify-between items-center rounded-xl border border-gray-300">
            <p className="text-lg font-bold">{title}:</p>
            <p>{value}</p>
        </div>
    )
}

export default UserDataField