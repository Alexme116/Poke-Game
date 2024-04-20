/* eslint-disable react/prop-types */
import './ScreenPokemones.css'

const ScreenPokemones = ({ pokemones, position }) => {
    const element = document.getElementById(position);
    if (element) {
        element.scrollIntoView();
    }

    return (
        <div className='screen-container'>
            <div className='screen-container-grid'>
                {pokemones.map((pokemon, idx) => (
                <div id={idx} className='pokemon-container' key={pokemon.id} style={{backgroundColor: idx === position ? 'rgba(255, 217, 0, 0.5)': 'transparent'}}>
                    <img className='pokemon-img' src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <h3>{pokemon.name}</h3>
                </div>
                ))}
            </div>
        </div>
    );
}

export default ScreenPokemones;