import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.css'

export default function Privacy(){

    return(
        <div>

            <div>
                
                <p className='parrafo'>20 ago 2022</p>
                <br/>
                <h4 className='title'>PRIVACY POLICY</h4>
                <br/>
<h5 className='title'>Our commitment to comply with the Law</h5>
<p className='parrafo'>This Privacy Policy affects the data you provide us, either through the forms, or through any other means at your disposal (telephone, email, etc.). By accepting this Privacy Policy, you give your consent for the company (hereinafter, the Tourist Intermediary) to process your personal data for the purposes indicated below.</p>
<br/>
<h6 className='title'>What information will we collect and what do we use it for?</h6>
<p className='parrafo'>We will ask for your name and your email in case you want to ask us or comment on something. We will only use it to process your queries.
We will also collect the necessary information to manage your reservations and to keep you informed of their status. We will ask for your name and surname, address, email, telephone number, credit card information and some other information that may be necessary for said purpose.
We will access and we will be able to treat the data that you have provided us in the forms and in the use that you make of the Website for the purposes set forth in this Privacy Policy.
In addition, by the use you make of the Page you will be able to provide various personal information, which we will use in a dissociated manner to compile statistics. With this, we intend to improve our services and offer you a personalized navigation.
Provided that you have previously allowed it, we will send you offers related to our services, via email. Said offers may include advertising from third parties related to the services you contracted.</p>
<br/>
<h6 className='title'>Data security</h6>
<p className='parrafo'>The entire reservation section on our website will be protected by an SSL security protocol, so that your data is safe. We try to prevent third parties from accessing them by making every reasonable effort to do so.</p>
<br/>
<h6 className='title'>Your rights</h6>
<p className='parrafo'>You can exercise your rights of access, rectification, cancellation and opposition according to the law by sending us a written request through the contact email of the page.</p>
<br/>
<h6 className='title'>Idiom</h6>
<p className='parrafo'>The language applicable to this Privacy Policy is English. If you have been offered versions of this Privacy Policy in other languages, it has been for your convenience and you expressly accept that they will always be governed by the English version.
If there is any contradiction between what the English version of this Privacy Policy says and what the translation says, in any case the English version will prevail.</p>
<br/>
<h6 className='title'>Doubts and queries</h6>
<p className='parrafo'>Of course, if you have doubts or questions about the protection of your data on this hotel website, you can contact us through the contact email and we will try to solve your doubts as soon as possible.</p>

            </div>

            <div>
            <Link to='/login'>
            <div className="d-grid gap-2 d-sm-block">
            <button className="btn btn-primary mt-4" type="button">Go Login</button>
            </div>
                
            </Link>
            </div>

        </div>
    )
}