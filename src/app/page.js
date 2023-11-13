import WordList from "@/components/WordList";

export default async function Home() {
    return (
        <div className='container'>
            <div className='header-area'>
                Learn English
            </div>

            <WordList></WordList>

            <div className='footer-area'>
                <p>&copy; This site is developed by rostom ali</p>
            </div>
        </div>
    )
}
