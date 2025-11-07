import appLogo from '/logo.png'
import '../App.css'

export default function Nav() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href=""><img src={appLogo} alt="Jolen's Property Checker Logo"/>&nbsp;<h3 className="julius-sans-one-regular m-0">PROP80</h3></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <a className="nav-link" href="">Link</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="">Link</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="">Link</a>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-2" type="text" placeholder="Search"/>
                    <button className="btn btn-primary" type="button">Search</button>
                </form>
                </div>
            </div>
        </nav>
      </header>
    </>
  )
}