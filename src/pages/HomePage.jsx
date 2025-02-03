import GreenButton from "../components/Buttons/GreenButton";
import Ticket from "../components/Cards/Ticket";

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] bg-black">
            <Ticket 
                image="https://cdn.discordapp.com/attachments/1250451346667081758/1336003245130125322/cresca-logo-footer.png?ex=67a2397b&is=67a0e7fb&hm=e09778abbee8c2583936670b5c6bd98e2b7b756d7a2602982efc4d7e8eb3e82a&"
                title="Cresca"
                description="Cresca is a platform for buying and selling tickets for events."
                price="100"
            />
        </div>
    );
}

export default HomePage;
