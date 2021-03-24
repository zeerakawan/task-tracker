import Button from './Button';

const Header = ({title}) => {
    const onClick = () => {
        console.log('Clicked')
    }

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color='green' text='Hit Me' onClick={onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

export default Header;
