import { getItemById } from "@/actions"

export default async function SinglePage({ params: { itemID } }) {

    const item = await getItemById(itemID);

    return(
        <div>
            <p>{item.description}</p>
        </div>
    )
}