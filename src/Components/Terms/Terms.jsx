import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {

    return (
        <div>
            <div >
                <p className='parrafo'>03 Nov 2022</p>
                <br />
                <h5 className='title'>Terms of use of the Affiliate partner account WorldDevelopers.com</h5>
                <br />
                <p className='parrafo'>WorldDevelopers.com may offer its business partners access to online user accounts, such as Connect (extranet) and the Affiliate Center (hereinafter "WorldDevelopers.com Services"). Persons who have access to these user accounts, whether through a direct agreement with WorldDevelopers.com or because they act on behalf of a WorldDevelopers.com partner (hereinafter the "Master Agreement"), must comply with the following Terms of use.</p>
                <p className='parrafo'>You agree not to use, or permit third parties to use, the WorldDevelopers.com Services for any purpose other than that agreed to in the Master Agreement, and not to:</p>
                <li className='parrafo'>Send unsolicited commercial emails to customers.</li>
                <li className='parrafo'>Falsifying information, including concealing your identity.</li>
                <li className='parrafo'>Upload viruses, malware or any type of malicious code.</li>
                <li className='parrafo'>Change, disable or circumvent any process of the WorldDevelopers.com systems.</li>
                <li className='parrafo'>Damage, disable, impair and/or overload WorldDevelopers.com systems.</li>
                <li className='parrafo'>Reverse engineer any of the services offered by WorldDevelopers.com</li>
                <li className='parrafo'>Copy or use WorldDevelopers.com trademarks, unless expressly agreed to with WorldDevelopers.com</li>
                <li className='parrafo'>Reveal, share or resell any of your user data.</li>
                <li className='parrafo'>Allow third parties access to WorldDevelopers.com systems for commercial or any other reason, without the express written consent of WorldDevelopers.com</li>
                <li className='parrafo'>Use the WorldDevelopers.com Services in violation of applicable laws, including those relating to the legal rights of others. This also includes uploading content that violates the intellectual property rights of third parties</li>
                <br />
                <p className='parrafo'>Loss or misuse of user data should be reported immediately to report@WorldDevelopers.com.</p>
                <p className='parrafo'>Failure to comply with these Terms of Use may result in the suspension of your access to the WorldDevelopers.com Services. WorldDevelopers.com reserves the right to take additional legal action, such as termination of the contract, in accordance with the respective Master Agreement.</p>
                <br />
                <p className='parrafo'>World Developers</p>
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

