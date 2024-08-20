import TopBar from "../TopBar";

function HomePage() {

    return (<>

        <TopBar></TopBar>
        <div className="homepage-container">
            <div className="upload-button">
                <h3>Upload images</h3>
        </div>
        <div className="view-button">
            <h3>View images</h3>
        </div>
        <div className="conn-button">
            <h3>Connect and Receive</h3>
        </div>
    </div >

</>
)
}

export default HomePage;