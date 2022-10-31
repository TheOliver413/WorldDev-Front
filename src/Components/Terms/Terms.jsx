import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms(){

    return(
        <div>
            <div >
            <h1  >Terms of use of the Affiliate partner account WorldDevelopers.com</h1>
            <p  >WorldDevelopers.com may offer its business partners access to online user accounts, such as Connect (extranet) and the Affiliate Center (hereinafter "WorldDevelopers.com Services"). Persons who have access to these user accounts, whether through a direct agreement with WorldDevelopers.com or because they act on behalf of a WorldDevelopers.com partner (hereinafter the "Master Agreement"), must comply with the following Terms of use.</p>
            <p  >You agree not to use, or permit third parties to use, the WorldDevelopers.com Services for any purpose other than that agreed to in the Master Agreement, and not to:</p>
            <li>Send unsolicited commercial emails to customers.</li>
            <li>Falsifying information, including concealing your identity.</li>
            <li>Upload viruses, malware or any type of malicious code.</li>
            <li>Change, disable or circumvent any process of the WorldDevelopers.com systems.</li>
            <li>Damage, disable, impair and/or overload WorldDevelopers.com systems.</li>
            <li>Reverse engineer any of the services offered by WorldDevelopers.com</li>
            <li>Copy or use WorldDevelopers.com trademarks, unless expressly agreed to with WorldDevelopers.com</li>
            <li>Reveal, share or resell any of your user data.</li>
            <li>Allow third parties access to WorldDevelopers.com systems for commercial or any other reason, without the express written consent of WorldDevelopers.com</li>
            <li>Use the WorldDevelopers.com Services in violation of applicable laws, including those relating to the legal rights of others. This also includes uploading content that violates the intellectual property rights of third parties</li>
            <p>Loss or misuse of user data should be reported immediately to report@WorldDevelopers.com.</p>
            <p>Failure to comply with these Terms of Use may result in the suspension of your access to the WorldDevelopers.com Services. WorldDevelopers.com reserves the right to take additional legal action, such as termination of the contract, in accordance with the respective Master Agreement.</p>
            <br></br>
            <p>World Developers</p>
            </div>
            <div>
                <Link to='/login'>
                <button>Go Login</button>
                </Link>
            </div>
        </div>
    )
}