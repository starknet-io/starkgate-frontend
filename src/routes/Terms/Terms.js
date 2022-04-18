import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {track, TrackEvent} from '../../analytics';
import {Button, FullScreenContainer} from '../../components/UI';
import {useColors, useConstants, useEnvs, useTranslation} from '../../hooks';
import {useTerms} from '../../providers/AppProvider';
import {useL1Wallet, useL2Wallet} from '../../providers/WalletsProvider';
import styles from './Terms.module.scss';

export const Terms = () => {
  const {STARKWARE_SITE_URL, STARKNET_DOCS_URL, STARKGATE_MAIL_ADDRESS, STARKGATE_CONTRACTS_URL} =
    useConstants();
  const {titleTxt, lastRevisedTxt, notesTitleTxt, acceptBtnTxt} = useTranslation('screens.terms');
  const navigate = useNavigate();
  const termsRef = useRef();
  const acceptButtonRef = useRef();
  const {appUrl} = useEnvs();
  const {isAcceptTerms, acceptTerms} = useTerms();
  const {colorGamma1, colorWhite} = useColors();
  const {account: l1account} = useL1Wallet();
  const {account: l2account} = useL2Wallet();
  const [marginBottom, setMarginBottom] = useState();
  const [acceptButtonEnable, setAcceptButtonEnable] = useState(false);

  useEffect(() => {
    track(TrackEvent.TERMS_SCREEN);
    setMarginBottom(acceptButtonRef?.current?.clientHeight);
  }, []);

  const onScroll = () => {
    if (termsRef.current) {
      const {scrollTop, scrollHeight, clientHeight} = termsRef.current;
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        setAcceptButtonEnable(true);
      }
    }
  };

  const accept = () => {
    track(TrackEvent.TERMS.ACCEPT_CLICK, {l1account, l2account});
    acceptTerms();
    navigate('/');
  };

  return (
    <FullScreenContainer>
      <div
        ref={termsRef}
        className={styles.terms}
        style={{
          marginBottom
        }}
        onScroll={onScroll}
      >
        <h1>{titleTxt}</h1>
        <h4>{lastRevisedTxt}</h4>
        <div>
          <p>
            <a href={STARKWARE_SITE_URL} rel="noreferrer" target="_blank">
              StarkWare Industries Ltd.
            </a>{' '}
            (&#34;<b>StarkWare</b>&#34;, &#34;<b>we</b>&#34;, &#34;<b>our</b>&#34;) welcomes you
            (the &#34;<b>User(s)</b>&#34;, or &#34;
            <b>you</b>&#34;) to{' '}
            <a href={appUrl} rel="noreferrer" target="_blank">
              {appUrl}
            </a>{' '}
            (the &#34;<b>Site&#34;</b>
            ), a website that provides information and hosts a user interface (the &#34;
            <b>Interface</b>
            &#34;) to a pair of smart contracts on the Ethereum blockchain and on the StarkNet
            network that facilitates your ability to conduct transactions with your ETH and ERC-20
            tokens that reside on Layer 1 in a gas-efficient manner, via the StarkNet Alpha network
            and its STARK-based computational compression capabilities (the &#34;<b>Bridge</b>
            &#34;). Each User may use the Site, Interface and/or Bridge<sup>1</sup> in accordance
            with, and subject to, the terms and conditions hereunder.
          </p>
          <ol>
            <li>
              <h2>Acceptance of the Terms</h2>
              <p>
                By entering, connecting to, accessing or using the Site, Interface and/or the
                Bridge, you acknowledge that you have read and understood the following Terms of
                Service (collectively, the &#34;<b>Terms</b>&#34;), and the terms of our{' '}
                <b>Privacy Policy</b> available at https://starknet.io/privacy-policy/ and you agree
                to be bound by them and to comply with all applicable laws and regulations regarding
                your use of the Site, Interface and the Bridge, and you acknowledge that these Terms
                constitute a binding and enforceable legal contract between StarkWare and you.{' '}
                <b>
                  IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT ENTER, CONNECT TO, ACCESS OR USE
                  THE SITE, INTERFACE AND/OR BRIDGE IN ANY MANNER.
                </b>
              </p>
              <p>
                <b>
                  THE BRIDGE OPERATES IN PART ON STARKNET, A PERMISSIONLESS DECENTRALIZED VALIDITY
                  -ROLLUP THAT OPERATES AS AN L2 NETWORK OVER ETHEREUM. WHEN YOU USE THE BRIDGE, YOU
                  ARE ALSO USING STARKNET TO SCALE YOUR ETHEREUM TRANSACTIONS. BY USING THE BRIDGE,
                  YOU ACKNOWLEDGE AND AGREE THAT YOU HAVE READ, AND AGREE TO, THE STARKNET TERMS OF
                  USE LOCATED AT https://starknet.io/terms/, WHICH WILL APPLY TO ANY USE BY YOU OF
                  THE BRIDGE AND/OR OF STARKNET.
                </b>
              </p>
              <p>
                The Site, Interface and Bridge are available only to individuals who (a) are at
                least eighteen (18) years old; and (b) possess the legal capacity to enter into
                these Terms (on behalf of themselves and their organization) and to form a binding
                agreement under any applicable law. You hereby represent that you possess the legal
                authority to enter into these Terms on your and (if applicable) your organization’s
                behalf and to form a binding agreement under any applicable law, to use the Site,
                Interface and Bridge in accordance with these Terms, and to fully perform your
                obligations hereunder.
              </p>
              <p>
                For the avoidance of doubt, if you are acting on behalf of an organization, any act
                or omission performed by you in connection with the Site, Interface and/or Bridge
                shall obligate your organization.
              </p>
              <p>
                <b>
                  Please be advised that these Terms contain provisions, including an Agreement to
                  Arbitrate, that govern how claims that you may have or assert against StarkWare
                  are resolved, which will require the parties to submit claims they may have
                  against one another to binding and final arbitration. Under the Agreement to
                  Arbitrate, the parties will (1) only be permitted to pursue claims against each
                  other on an individual basis, not as a plaintiff or class member in any class or
                  representative action or proceeding and (2) only be permitted to seek relief
                  (including monetary, injunctive, and declaratory relief) on an individual basis.
                </b>
              </p>
            </li>
            <li>
              <h2>The Site, Interface and Bridge - Explanation and Certain Risk Factors</h2>
              <p>
                <b>
                  The Site and Interface <i>do not</i> offer the Bridge, which is a pair of
                  autonomously functioning smart contracts on the Ethereum Blockchain and StarkNet,
                  and which may be accessed independently without use of the Site or the Interface.
                  <sup>2</sup>
                </b>
              </p>
              <p>
                Use of the Bridge and any activity thereon is subject to any additional terms and
                conditions that may be included in the Bridge, including those located at the{' '}
                <a href={STARKGATE_CONTRACTS_URL} rel="noreferrer" target="_blank">
                  following link
                </a>
                .
              </p>
              <p>
                <b>
                  <i>YOUR USE OF THE BRIDGE IS ENTIRELY AT YOUR OWN RISK.</i>
                </b>
              </p>
              <p>
                On the Site, you will have the ability via the Interface to access the Bridge. More
                information about the Bridge is available{' '}
                <a href={STARKGATE_CONTRACTS_URL} rel="noreferrer" target="_blank">
                  here
                </a>
                .
              </p>
              <p>
                <i>Decentralized Protocol</i>: The Bridge is a pair of decentralized smart
                contracts, one running on the Ethereum blockchain and the other on StarkNet. The
                Interface provides an Interface to access the Bridge in a user-friendly manner,
                [however due to its decentralized nature StarkWare does not control the Bridge1].
                The Bridge is non-custodial. StarkWare does not have any ability to control or
                modify how you conduct transactions on Ethereum or StarkNet. By using the Bridge,
                you acknowledge and recognize that use of the Bridge is at your own risk and will be
                subject to the rules encoded within the Bridge, including as to when and on what
                terms and at which speed your transactions are conducted on Ethereum and/or
                StarkNet, neither of which StarkWare can influence or fully control.
              </p>
              <p>
                <i>Risk Disclosures Relating to Blockchain</i>. By utilizing the Bridge, you
                represent that you understand the inherent risks associated with cryptocurrency
                systems; and warrant that you have an understanding of the usage and intricacies of
                cryptographic tokens, digital assets, blockchains and other distributed and
                decentralized systems, and smart contracts. In particular, you are aware and
                recognize that any transactions conducted on a blockchain cannot be undone or
                reversed.
              </p>
              <p>
                <i>Information</i>. The site may contain information regarding the Bridge or
                particular instances of the Bridge. Such information is provided for informational
                purposes only, without any representation or warranty. StarkWare does not assume any
                responsibility or liability for the accuracy or inaccuracy of any such information.
                Before acting upon or making any decisions on the basis of such information, you are
                responsible to independently verify such information.
              </p>
              <p>
                <i>Fees</i>. StarkWare reserves the right to charge fees for use of the bridge , and
                in such case shall display to you any applicable fees prior to you incurring the
                fee. There are fees and costs associated with using the Bridge, a description of
                which can be found{' '}
                <a href={`${STARKNET_DOCS_URL}/fee-mechanism`} rel="noreferrer" target="_blank">
                  here
                </a>
                .
              </p>
              <p>
                <i>We are not responsible for any loss</i>: The Bridge, StarkNet and other
                blockchain networks are decentralized systems that are still under active
                development, and therefore: (a) may contain bugs, errors and defects, (b) may
                function improperly or be subject to periods of downtime and unavailability, (c) may
                result in total or partial loss or corruption of cryptocurrencies with respect to
                which they are used and/or data, (d) may be modified at any time, including through
                the release of subsequent versions, all with or without notice to you, or (e) may
                have security vulnerabilities and be subject to hacking. StarkWare will not be
                liable or responsible for any losses or damages to you, including without limitation
                any loss of funds on Ethereum and/or StarkNet with which you conduct your
                transactions using the Bridge, as a result of any of the foregoing.
              </p>
              <p>
                <b>
                  WITHOUT LIMITING THE GENERALITY OF ANY OTHER PROVISION OF THE TERMS, YOU
                  ACKNOWLEDGE AND AGREE THAT YOU ASSUME FULL RESPONSIBILITY FOR YOUR USE OF THE
                  SITE, THE INTERFACE, AND THE BRIDGE, ALL OF WHICH WILL BE AT YOUR OWN RISK.
                  RECOGNIZING SUCH, YOU UNDERSTAND AND AGREE THAT, TO THE FULLEST EXTENT PERMITTED
                  BY APPLICABLE LAW, NEITHER STARKWARE NOR ITS SHAREHOLDERS, OFFICERS OR DIRECTORS
                  WILL BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, PUNITIVE, EXEMPLARY OR OTHER DAMAGES OF ANY KIND, INCLUDING WITHOUT
                  LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, CRYPTOCURRENCIES OR
                  OTHER TANGIBLE OR INTANGIBLE LOSSES OR ANY OTHER DAMAGES BASED ON CONTRACT, TORT,
                  STRICT LIABILITY OR ANY OTHER THEORY (EVEN IF STARKWARE HAD BEEN ADVISED OF THE
                  POSSIBILITY OF SUCH DAMAGES), RESULTING FROM THE SITE, THE INTERFACE OR THE
                  BRIDGE.
                </b>
              </p>
              <p>
                <b>
                  SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE
                  LIMITATION OR EXCLUSION OF LIABILITY FOR DIRECT, INDIRECT, INCIDENTAL OR
                  CONSEQUENTIAL DAMAGES. ACCORDINGLY, IN SUCH JURISDICTIONS THE FOREGOING WILL BE
                  REINTERPRETED SO AS TO BE EFFECTIVE TO GREATEST EXTENT POSSIBLE UNDER APPLICABLE
                  LAW.
                </b>
              </p>
            </li>
            <li>
              <h2>Use Restrictions; Compliance</h2>
              <p>
                There are certain conducts which are strictly prohibited when using the Site and
                Interface. Please read the following restrictions carefully. Failure to comply with
                any of the provisions set forth herein may result (at StarkWare’s sole discretion)
                in the termination of your use of the Site and/or Interface and may also expose you
                to civil and/or criminal liability.
              </p>
              <p>
                The Interface and/or Bridge may not be available or appropriate for use in certain
                jurisdictions. By accessing or using the Interface and/or Bridge, you agree that you
                are solely and entirely responsible for compliance with all laws and regulations
                that may apply to you. You may not use the Interface and/or Bridge if you are a
                citizen, resident, or member of any jurisdiction or group that is subject to
                economic sanctions, or if your use of the Interface and/or Bridge would be illegal
                or otherwise violate any applicable law. You may not use the Interface in connection
                with or which would involve proceeds of any unlawful activity.
              </p>
            </li>
            <li>
              <h2>Minors</h2>
              <p>
                The Site, Interface and Bridge are intended for Users over the age of eighteen (18).
              </p>
            </li>
            <li>
              <h2>Contacting us via the Site</h2>
              <p>
                In order to contact us, please email us at:{' '}
                <a href={`mailto:${STARKGATE_MAIL_ADDRESS}`}>{STARKGATE_MAIL_ADDRESS}</a>
              </p>
            </li>
            <li>
              <h2>Links to Third Party Sites</h2>
              <p>
                Certain links provided herein may permit our Users to leave this Site and enter non-
                StarkWare sites or platform. Those linked sites and platform are provided solely as
                a convenience to you. These linked sites and platform are not under the control of
                StarkWare and it is not responsible for the availability of such external sites or
                platform, and does not endorse and is not responsible or liable for any content
                including but not limited to content advertising, products or other information on
                or available from such linked sites and platform or any link contained in linked
                sites or service. In addition, StarkWare is not responsible or liable for such
                linked sites and platform’ privacy practices and/or any other practices. Your access
                to, use of and reliance upon any such sites, platform and content and your dealings
                with such third parties are at your sole risk and expense. You further acknowledge
                and agree that StarkWare shall not be responsible or liable, directly or indirectly,
                for any damage or loss caused or alleged to be caused, by or in connection with use
                of or reliance on any platform, content, products or other materials available on or
                through such linked sites or resource.
              </p>
            </li>
            <li>
              <h2>Availability</h2>
              <p>
                The Site’s, the Interface’s and the Bridge’s availability and functionality depends
                on various factors, such as communication networks and public blockchain networks.
                StarkWare does not warrant or guarantee that the Site and/or Interface and/or Bridge
                will operate and/or be available at all times without disruption or interruption, or
                that it will be immune from unauthorized access or error-free.
              </p>
            </li>
            <li>
              <h2>Changes to The Site</h2>
              <p>
                StarkWare reserves the right to modify, correct, amend, enhance, improve, make any
                other changes to, or discontinue, temporarily or permanently this Site and/or the
                Interface and/or Bridge1 (or any part thereof) without notice, at any time. In
                addition, you hereby acknowledge that the content provided under this Site may be
                changed, extended in terms of content and form or removed at any time without any
                notice to you. You agree that StarkWare shall not be liable to you or to any third
                party for any modification, suspension, or discontinuance of this Site or the
                Interface or the Bridge. You hereby agree that StarkWare is not responsible for any
                errors or malfunctions that may occur in connection with the performance of such
                changes.
              </p>
            </li>
            <li>
              <h2>Disclaimers and No Warranties</h2>
              <p>
                TO THE FULLEST EXTENT LEGALLY PERMISSIBLE, THE SITE AND THE INTERFACE ARE PROVIDED
                ON AN &#34;<b>AS IS</b>&#34;, &#34;<b>WITH ALL FAULTS</b>&#34; AND &#34;
                <b>AS AVAILABLE</b>&#34; BASIS, AND STARKWARE, INCLUDING ITS VENDORS, OFFICERS,
                SHAREHOLDERS, SUB-CONTRACTORS, DIRECTORS, EMPLOYEES, AFFILIATES, SUBSIDIARIES,
                LICENSORS, AGENTS AND SUPPLIERS (COLLECTIVELY, &#34;
                <b>STARKWARE’S REPRESENTATIVES</b>
                &#34;), DISCLAIM ALL WARRANTIES OF ANY KIND, EXPRESS, IMPLIED OR STATUTORY,
                INCLUDING BUT NOT LIMITED TO WARRANTIES OF TITLE OR NON-INFRINGEMENT OR IMPLIED
                WARRANTIES OF USE, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE AND THOSE
                ARISING FROM A COURSE OF DEALING OR USAGE OF TRADE. YOU MAY HAVE ADDITIONAL CONSUMER
                RIGHTS UNDER YOUR LOCAL LAWS THAT THIS AGREEMENT CANNOT CHANGE.
              </p>
              <p>
                ADDITIONAL DISCLAIMERS AND WARRANTIES REGARDING THE BRIDGE MAY APPLY PURSUANT TO
                ADDITIONAL TERMS AND CONDITIONS INCLUDED IN THE BRIDGE.
              </p>
              <p>
                <b>WE DO NOT WARRANT</b> (I) THAT THE USE AND OPERATION OF THE SITE, THE INTERFACE
                AND/OR THE BRIDGE IS OR WILL BE SECURE, TIMELY, ACCURATE, COMPLETE, UNINTERRUPTED,
                WITHOUT ERRORS, OR FREE OF VIRUSES, DEFECTS, WORMS, OTHER HARMFUL COMPONENTS OR
                OTHER PROGRAM LIMITATIONS, (II) THAT WE WILL CORRECT ANY ERRORS OR DEFECTS IN THE
                SITE OR THE INTERFACE, (III) AND/OR MAKE ANY REPRESENTATION REGARDING THE USE,
                INABILITY TO USE OR OPERATE, OR THE RESULTS OF THE USE OF THE SITE AND/OR INTERFACE
                AND/OR BRIDGE (INCLUDING THAT THE RESULTS OF USING THE SITE AND/OR INTERFACE AND/OR
                BRIDGE WILL MEET YOUR REQUIREMENTS). STARKWARE AND STARKWARE’S REPRESENTATIVES
                DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THE USE OF THE SITE AND THE
                INTERFACE, INCLUDING BUT NOT LIMITED TO THE AVAILABILITY, RELIABILITY OR THE QUALITY
                OF THE SITE AND THE INTERFACE, AND ARE NOT AND SHALL NOT BE RESPONSIBLE FOR ANY
                ERROR, FAULT OR MISTAKE RELATED TO ANY CONTENT AND/OR INFORMATION DISPLAYED WITHIN
                THE SITE OR THE INTERFACE.
              </p>
              <p>
                WE ARE NOT RESPONSIBLE AND HAVE NO LIABILITY FOR ANY ITEM OR SERVICE PROVIDED BY ANY
                PERSON OR ENTITY OTHER THAN STARKWARE.
              </p>
              <p>
                WE ARE NOT RESPONSIBLE FOR ANY CONSEQUENCES TO YOU OR OTHERS THAT MAY RESULT FROM
                TECHNICAL PROBLEMS (INCLUDING WITHOUT LIMITATION IN CONNECTION WITH THE INTERNET
                SUCH AS SLOW CONNECTIONS, TRAFFIC CONGESTION, OVERLOAD OF SERVERS, DELAYS OR
                INTERRUPTIONS) OR ANY TELECOMMUNICATIONS OR INTERNET PROVIDERS OR ANY BLOCKCHAIN
                NETWORK.
              </p>
              <p>
                YOU AGREE THAT USE OF THE SITE, THE INTERFACE AND/OR THE BRIDGE IS ENTIRELY AT YOUR
                OWN RISK.
              </p>
              <p>
                INASMUCH AS SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSIONS OR LIMITATIONS AS SET
                FORTH HEREIN, THE FULL EXTENT OF THE ABOVE EXCLUSIONS AND LIMITATIONS MAY NOT APPLY.
              </p>
            </li>
            <li>
              <h2>Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT LEGALLY PERMISSIBLE, IN NO EVENT SHALL STARKWARE, INCLUDING
                STARKWARE’S REPRESENTATIVES BE LIABLE FOR ANY DAMAGES WHATSOEVER, INCLUDING, BUT NOT
                LIMITED TO, DIRECT, INDIRECT, SPECIAL, PUNITIVE, EXEMPLARY, INCIDENTAL OR
                CONSEQUENTIAL DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY (INCLUDING, WITHOUT
                LIMITATION, CONTRACT, NEGLIGENCE, TORT OR STRICT LIABILITY), INCLUDING, WITHOUT
                LIMITATION, LOSS OF GOODWILL, PROFITS OR DATA AND BUSINESS INTERRUPTION, ARISING
                HEREUNDER, RESULTING FROM OR ARISING OUT OF THE SITE, THE INTERFACE AND/OR THE
                STARKWARE, AND/OR THE FAILURE OF THE SITE, THE INTERFACE AND/OR THE STARKWARE TO
                PERFORM AS REPRESENTED OR EXPECTED, OR FROM ANY CONTENT, OR FROM THE PERFORMANCE OR
                FAILURE OF STARKWARE TO PERFORM UNDER THESE TERMS, ANY OTHER ACT OR OMISSION OF
                STARKWARE OR STARKWARE ‘S REPRESENTATIVES BY ANY OTHER CAUSE WHATSOEVER; OR BASED
                UPON BREACH OF WARRANTY, GUARANTEE OR CONDITION, BREACH OF CONTRACT, NEGLIGENCE,
                STRICT LIABILITY, TORT, OR ANY OTHER LEGAL THEORY, REGARDLESS OF WHETHER STARKWARE
                OR STARKWARE’S REPRESENTATIVES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p>
                IN ANY CASE, WITHOUT LIMITING THE GENERALITY OF THE FOREGOING AND TO THE MAXIMUM
                EXTENT LEGALLY PERMISSIBLE, STARKWARE AND STARKWARE’S REPRESENTATIVES’ TOTAL
                AGGREGATE LIABILITY FOR ALL DAMAGES OR LOSSES WHATSOEVER ARISING HEREUNDER OR IN
                CONNECTION WITH YOUR USE OR INABILITY TO USE THE SITE, THE INTERFACE AND/OR THE
                BRIDGE SHALL BE LIMITED TO THE AMOUNT ACTUALLY PAID BY YOU, IF ANY, TO STARKWARE FOR
                USE OF THE SITE, INTERFACE OR BRIDGE IN RESPECT OF THE PARTICULAR TRANSACTION IN
                CONNECTION WITH WHICH THE LOSS OCCURRED, OR $US 10.00, WHICHEVER IS GREATER. YOU
                WILL NOT, AND WAIVE ANY RIGHT TO, SEEK TO RECOVER ANY OTHER DAMAGES, INCLUDING
                CONSEQUENTIAL, LOST PROFITS, LOSS OF FUNDS, SPECIAL, INDIRECT OR INCIDENTAL DAMAGES
                FROM STARKWARE AND FROM STARKWARE’S REPRESENTATIVES.
              </p>
              <p>
                INASMUCH AS SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSIONS OR LIMITATIONS AS SET
                FORTH HEREIN, THE FULL EXTENT OF THE ABOVE EXCLUSIONS AND LIMITATIONS MAY NOT APPLY.
              </p>
            </li>
            <li>
              <h2>Release of Claims</h2>
              <p>
                The source code of the software underlying the Bridge is publicly accessible. Before
                using the Interface and the Bridge, it is your responsibility to familiarize
                yourself with the functionality and methods of operation of the Bridge. You
                expressly agree that you assume all risks in connection with your access and use of
                the Interface and your interaction with the Bridge. You further expressly waive and
                release us from any and all liability, claims, causes of action, or damages arising
                from or in any way relating to your use of the Interface and your interaction with
                the Bridge.
              </p>
            </li>
            <li>
              <h2>Amendments to the Terms</h2>
              <p>
                StarkWare may, at its sole discretion, change the Terms from time to time, including
                any other policies incorporated thereto, so please re-visit this page frequently. In
                case of any material change, we will make reasonable efforts to post a clear notice
                on the Site regarding such change. Such material changes will take effect seven (7)
                days after such notice was provided on our Site. Otherwise, all other changes to
                these Terms are effective as of the stated &quotLast Revised&#34; date and your
                continued use of the Site or the Interface or the Bridge on or after the Last
                Revised date will constitute acceptance of, and agreement to be bound by, those
                changes. In the event that the Terms should be amended to comply with any legal
                requirements or security concerns, the amendments may take effect immediately, or as
                required by the law and without any prior notice.
              </p>
            </li>
            <li>
              <h2>
                Termination of these Terms and the Termination of the Site’s and Interface’s and
                Bridge’s Operation
              </h2>
              <p>
                At any time, StarkWare may without notice discontinue your use of the Site or the
                Interface or the Bridge, at its sole discretion, in addition to any other remedies
                that may be available to StarkWare under any applicable law.
              </p>
              <p>
                Additionally, StarkWare may at any time, at its sole discretion, cease the operation
                of the Site or the Interface or the Bridge or any part thereof, temporarily or
                permanently, delete any information or content from the Site or correct, modify,
                amend, enhance, improve and make any other changes thereto or discontinue displaying
                or providing any information, Content or features therein without giving any prior
                notice. You agree and acknowledge that StarkWare does not assume any responsibility
                with respect to, or in connection with the termination of the Site’s or the
                Interface’s or the Bridge’s operation and loss of any data. The provisions of these
                Terms that, by their nature and content, must survive the termination of these Terms
                in order to achieve the fundamental purposes of these Terms shall so survive.
                Without limiting the generality of the forgoing, the Intellectual Property,
                Disclaimer and Warranties, Limitation of Liability, Indemnification and General
                sections will survive the termination of the Terms.
              </p>
            </li>
            <li>
              <h2>
                Governing Law; Jurisdiction; Agreement to Arbitrate; No Class Action; Waiver of
                Right to Jury Trial
              </h2>
              <p>
                Any claim relating to the Site, the Interface, the Bridge or the use thereof will be
                governed by and interpreted in accordance with the laws of Singapore, without
                reference to its conflict-of-laws principles and the United Nations Convention
                Relating to a Uniform Law on the International Sale of Goods may not be applied.
              </p>
              <p>
                All disputes arising out of or in connection with the present contract shall be
                finally settled under the Rules of Arbitration of the International Chamber of
                Commerce by one or more arbitrators appointed in accordance with the said Rules. The
                arbitration will be conducted in the English language and held by teleconference or,
                if teleconference is not possible, in Singapore (the &#34;
                <b>Agreement to Arbitrate</b>
                &#34;).
              </p>
              <p>
                You must bring any and all claims or disputes against us in your individual capacity
                and not as a plaintiff in or member of any purported class action, collective
                action, private attorney general action, or other representative proceeding. This
                provision applies to class arbitration.
              </p>
              <p>You and we both agree to waive the right to demand a trial by jury.</p>
              <p>
                Notwithstanding the foregoing, StarkWare may seek injunctive relief in any court of
                competent jurisdiction.
              </p>
            </li>
            <li>
              <h2>General</h2>
              <p>
                (a) These Terms constitute the entire terms and conditions between you and StarkWare
                relating to the subject matter herein and supersedes any and all prior or
                contemporaneous written or oral agreements or understandings between you and
                StarkWare, (b) these Terms do not, and shall not be construed to create any
                relationship, partnership, joint venture, employer-employee, agency, or
                franchisor-franchisee relationship between the parties hereto, (c) no waiver by
                either party of any breach or default hereunder will be deemed to be a waiver of any
                preceding or subsequent breach or default, (d) any heading, caption or section title
                contained herein is inserted only as a matter of convenience, and in no way defines
                or explains any section or provision hereof, (e){' '}
                <b>
                  YOU ACKNOWLEDGE AND AGREE THAT ANY CAUSE OF ACTION THAT YOU MAY HAVE ARISING OUT
                  OF OR RELATED TO THE SITE MUST COMMENCE WITHIN ONE (1) YEAR AFTER THE CAUSE OF
                  ACTION ACCRUES. OTHERWISE, SUCH CAUSE OF ACTION IS PERMANENTLY BARRED
                </b>
                , (f) if any provision hereof is adjudged by any court of competent jurisdiction to
                be unenforceable, that provision shall be limited or eliminated to the minimum
                extent necessary so that these Terms shall otherwise remain in full force and effect
                while most nearly adhering to the intent expressed herein, (g) you may not assign or
                transfer these Terms (including all rights and obligations hereunder) without our
                prior written consent and any attempt to do so in violation of the foregoing shall
                be void. We may assign or transfer these Terms without restriction or notification,
                (h) no amendment hereof will be binding unless in writing and signed by StarkWare,
                and (i) the parties agree that all correspondence relating to these Terms shall be
                written and in the English language.
              </p>
            </li>
          </ol>
        </div>
      </div>
      {!isAcceptTerms && (
        <div ref={acceptButtonRef} className={styles.acceptButton}>
          <Button
            colorBackground={colorGamma1}
            colorBackgroundHover={colorGamma1}
            colorBorder={colorGamma1}
            colorText={colorWhite}
            height={0}
            isDisabled={!acceptButtonEnable}
            style={{
              width: '100%'
            }}
            text={acceptBtnTxt}
            onClick={accept}
          />
          <p>
            By clicking the &#34;I Accept&#34; button, you are accepting our{' '}
            <a href={`${appUrl}/terms`} rel="noreferrer" target="_blank">
              Terms of Service
            </a>
          </p>
        </div>
      )}
    </FullScreenContainer>
  );
};
