import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMyBoliche } from '../../../redux/actions'
import NavBarUser from '../NavBarUser/NavBarUser'

function Home() {
    const { clubName } = useParams()
    const dispatch = useDispatch()



    return (

        <div>
            <NavBarUser />
            <h1>Estas en {clubName}</h1>
            <div>
                <p>Tragos</p>

            </div>
            <div>
                <p>Cervezas</p>

            </div>
            <div>
                <p>Botellas</p>

            </div>
            <div>
                <p>Vinos</p>

            </div>
            <div>
                <p>Shots</p>

            </div>
            <div>
                <p>Sin Alcohol</p>

            </div>

        </div>
    )
}

export default Home


