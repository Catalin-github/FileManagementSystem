/** @format */

import React, { Component } from 'react';

export default class Help extends Component {
	render() {
		return (
			<div>
				<h1>Pasi de utilizare a aplicatiei!</h1>
				<br />
				<ol>
					<li>Inregistreaza-te in aplicatie navingand catre ruta /register</li>
					<br />{' '}
					<li>
						Acceseaza link-ul pe care l-ai primit prin adresa de email folosita
						la inregistrearea contului{' '}
					</li>
					<br />{' '}
					<li>
						Navigheaza catre pagina de Login folosind ruta /login si introdu
						datele de autentificare
					</li>
					<br />{' '}
					<li>
						Incarca sau acceseaza imaginile folosind link-ul 'Portofoliu imagini
						de pe pagina de dashboard
					</li>
					<br />{' '}
					<li>
						{' '}
						Incarca sau acceseaza portofoliul de fisiere audio folosing link-ul
						'Portofoliu de fisiere video' de pe pagina de dashboard
					</li>
					<br />{' '}
					<li>
						Modifica datele contului tau accesand butonul 'Profil' de pe pagina
						de dashboard
					</li>
					<br />{' '}
					<li>
						Delogheaza-te din aplicatie folosind butonul 'Delogare' din pagina
						de dashboard{' '}
					</li>
				</ol>
			</div>
		);
	}
}
