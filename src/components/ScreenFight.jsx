/* eslint-disable react/prop-types */
import './ScreenFight.css'

const ScreenPokemones = ({ player, enemy, playerHealth, enemyHealth }) => {
    return (
        <div className='fight-container'>
            <div className='players-divition'>
                <div className='name-character-divition-player'>
                    <div className='name-health-player'>
                        <p className='text-character'>Health <a>{playerHealth}</a></p>
                        <p className='text-character'>{player[0].name}</p>
                    </div>
                    <div className='contenedor-img'>
                        <img className='img-player' src={player[0].sprites.back_default} alt={player[0].name} />
                    </div>
                </div>
                <div className='name-character-divition-enemy'>
                    <img className='img-enemy' src={enemy[0].sprites.front_default} alt={enemy[0].name} />
                    <div className='name-health-enemy'>
                        <p className='text-character'>Health <a>{enemyHealth}</a></p>
                        <p className='text-character'>{enemy[0].name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScreenPokemones;