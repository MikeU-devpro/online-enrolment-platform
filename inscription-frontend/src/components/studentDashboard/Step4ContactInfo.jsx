import React, { useState, useEffect } from 'react';
import Button from '../common/Button.jsx';

const Step4ContactInfo = ({ initialData = {}, onSaveAndNext, onSave, onPrevious }) => {
    const [email, setEmail] = useState(initialData.email || '');
    const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber || '');
    const [countryCode, setCountryCode] = useState(initialData.countryCode || '+237');
    const [country, setCountry] = useState(initialData.country || '');
    const [region, setRegion] = useState(initialData.region || '');
    const [city, setCity] = useState(initialData.city || '');
    const [address, setAddress] = useState(initialData.address || '');
    const [emergencyContactName1, setEmergencyContactName1] = useState(initialData.emergencyContactName1 || '');
    const [emergencyContactPhone1, setEmergencyContactPhone1] = useState(initialData.emergencyContactPhone1 || '');
    const [emergencyContactCode1, setEmergencyContactCode1] = useState(initialData.emergencyContactCode1 || '+237');
    const [emergencyContactRelationship1, setEmergencyContactRelationship1] = useState(initialData.emergencyContactRelationship1 || '');
    const [emergencyContactName2, setEmergencyContactName2] = useState(initialData.emergencyContactName2 || '');
    const [emergencyContactPhone2, setEmergencyContactPhone2] = useState(initialData.emergencyContactPhone2 || '');
    const [emergencyContactCode2, setEmergencyContactCode2] = useState(initialData.emergencyContactCode2 || '+237');
    const [emergencyContactRelationship2, setEmergencyContactRelationship2] = useState(initialData.emergencyContactRelationship2 || '');

    useEffect(() => {
        if (initialData) {
            setEmail(initialData.email || '');
            setPhoneNumber(initialData.phoneNumber || '');
            setCountryCode(initialData.countryCode || '+237');
            setCountry(initialData.country || '');
            setRegion(initialData.region || '');
            setCity(initialData.city || '');
            setAddress(initialData.address || '');
            setEmergencyContactName1(initialData.emergencyContactName1 || '');
            setEmergencyContactPhone1(initialData.emergencyContactPhone1 || '');
            setEmergencyContactCode1(initialData.emergencyContactCode1 || '+237');
            setEmergencyContactRelationship1(initialData.emergencyContactRelationship1 || '');
            setEmergencyContactName2(initialData.emergencyContactName2 || '');
            setEmergencyContactPhone2(initialData.emergencyContactPhone2 || '');
            setEmergencyContactCode2(initialData.emergencyContactCode2 || '+237');
            setEmergencyContactRelationship2(initialData.emergencyContactRelationship2 || '');
        }
    }, [initialData]);

    const countryCodes = ['+237', '+33', '+1', '+44', '+49'];

    const collectData = () => {
        return {
            email,
            phoneNumber,
            countryCode,
            country,
            region,
            city,
            address,
            emergencyContactName1,
            emergencyContactPhone1,
            emergencyContactCode1,
            emergencyContactRelationship1,
            emergencyContactName2,
            emergencyContactPhone2,
            emergencyContactCode2,
            emergencyContactRelationship2,
        };
    };

    const handleSaveClick = () => {
        onSave(collectData());
    };

    const handleNextClick = () => {
        onSaveAndNext(collectData());
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-x-[1.28rem] gap-y-[1.28rem]">
                <div>
                    <label htmlFor="email" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full h-[2.98rem] px-[0.85rem] rounded-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                        style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                        placeholder="igniteacademy@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="phoneNumber" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Numéro de téléphone</label>
                    <div className="flex">
                        <select
                            id="countryCode"
                            className="h-[2.98rem] pr-[2rem] pl-[0.85rem] rounded-l-[0.21rem] border border-r-0 border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333] appearance-none"
                            style={{
                                backgroundColor: 'rgba(242, 242, 242, 0.6)',
                                fontSize: '1.5rem',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236B4F8B' d='M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 10.586l-3.586-3.586L5 8.293z'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.85rem center',
                                backgroundSize: '1.28rem',
                            }}
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        >
                            {countryCodes.map(code => <option key={code} value={code}>{code}</option>)}
                        </select>
                        <input
                            type="tel"
                            id="phoneNumber"
                            className="flex-1 h-[2.98rem] px-[0.85rem] rounded-r-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                            style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                            placeholder="612 345 678"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="country" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Pays</label>
                    <input
                        type="text"
                        id="country"
                        className="w-full h-[2.98rem] px-[0.85rem] rounded-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                        style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                        placeholder="Entrez votre pays"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="region" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Région</label>
                    <input
                        type="text"
                        id="region"
                        className="w-full h-[2.98rem] px-[0.85rem] rounded-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                        style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                        placeholder="Entrez votre région"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Ville</label>
                    <input
                        type="text"
                        id="city"
                        className="w-full h-[2.98rem] px-[0.85rem] rounded-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                        style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                        placeholder="Entrez votre ville"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Adresse</label>
                    <input
                        type="text"
                        id="address"
                        className="w-full h-[2.98rem] px-[0.85rem] rounded-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                        style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                        placeholder="Entrez votre adresse"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="emergencyContactName1" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Nom de la personne à contacter en cas d'urgence (1)</label>
                    <input
                        type="text"
                        id="emergencyContactName1"
                        className="w-full h-[2.98rem] px-[0.85rem] rounded-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                        style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                        placeholder="Entrez le nom de la personne à contacter en cas d'urgence"
                        value={emergencyContactName1}
                        onChange={(e) => setEmergencyContactName1(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="emergencyContactName2" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Nom de la personne à contacter en cas d'urgence (2)</label>
                    <input
                        type="text"
                        id="emergencyContactName2"
                        className="w-full h-[2.98rem] px-[0.85rem] rounded-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                        style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                        placeholder="Entrez le nom de la personne à contacter en cas d'urgence"
                        value={emergencyContactName2}
                        onChange={(e) => setEmergencyContactName2(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="emergencyContactPhone1" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Téléphone de la personne à contacter (1)</label>
                    <div className="flex">
                        <select
                            id="emergencyContactCode1"
                            className="h-[2.98rem] pr-[2rem] pl-[0.85rem] rounded-l-[0.21rem] border border-r-0 border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333] appearance-none"
                            style={{
                                backgroundColor: 'rgba(242, 242, 242, 0.6)',
                                fontSize: '1.5rem',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236B4F8B' d='M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 10.586l-3.586-3.586L5 8.293z'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.85rem center',
                                backgroundSize: '1.28rem',
                            }}
                            value={emergencyContactCode1}
                            onChange={(e) => setEmergencyContactCode1(e.target.value)}
                        >
                            {countryCodes.map(code => <option key={code} value={code}>{code}</option>)}
                        </select>
                        <input
                            type="tel"
                            id="emergencyContactPhone1"
                            className="flex-1 h-[2.98rem] px-[0.85rem] rounded-r-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                            style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                            placeholder="612 345 678"
                            value={emergencyContactPhone1}
                            onChange={(e) => setEmergencyContactPhone1(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="emergencyContactPhone2" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Téléphone de la personne à contacter (2)</label>
                    <div className="flex">
                        <select
                            id="emergencyContactCode2"
                            className="h-[2.98rem] pr-[2rem] pl-[0.85rem] rounded-l-[0.21rem] border border-r-0 border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333] appearance-none"
                            style={{
                                backgroundColor: 'rgba(242, 242, 242, 0.6)',
                                fontSize: '1.5rem',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236B4F8B' d='M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 10.586l-3.586-3.586L5 8.293z'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.85rem center',
                                backgroundSize: '1.28rem',
                            }}
                            value={emergencyContactCode2}
                            onChange={(e) => setEmergencyContactCode2(e.target.value)}
                        >
                            {countryCodes.map(code => <option key={code} value={code}>{code}</option>)}
                        </select>
                        <input
                            type="tel"
                            id="emergencyContactPhone2"
                            className="flex-1 h-[2.98rem] px-[0.85rem] rounded-r-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                            style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                            placeholder="612 345 678"
                            value={emergencyContactPhone2}
                            onChange={(e) => setEmergencyContactPhone2(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="emergencyContactRelationship1" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Lien de parenté (1)</label>
                    <input
                        type="text"
                        id="emergencyContactRelationship1"
                        className="w-full h-[2.98rem] px-[0.85rem] rounded-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                        style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                        placeholder="Entrez le lien de parenté"
                        value={emergencyContactRelationship1}
                        onChange={(e) => setEmergencyContactRelationship1(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="emergencyContactRelationship2" className="block text-[#333333] text-[1.5rem] font-normal mb-[0.21rem]">Lien de parenté (2)</label>
                    <input
                        type="text"
                        id="emergencyContactRelationship2"
                        className="w-full h-[2.98rem] px-[0.85rem] rounded-[0.21rem] border border-[#79747E] focus:outline-none focus:ring-2 focus:ring-[#6B4F8B] text-[#333333]"
                        style={{ backgroundColor: 'rgba(242, 242, 242, 0.6)', fontSize: '1.5rem' }}
                        placeholder="Entrez le lien de parenté"
                        value={emergencyContactRelationship2}
                        onChange={(e) => setEmergencyContactRelationship2(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-between gap-4 mt-8">
                <Button
                    secondary
                    type="button"
                    onClick={onPrevious}
                    className="flex-1 !w-auto font-semibold text-[1.28rem] leading-[127.5%] tracking-[0.0298rem]"
                    style={{ fontFamily: 'Roboto, sans-serif', height: '2.98rem' }}
                >
                    Précédent
                </Button>
                <Button
                    primary
                    type="button"
                    onClick={handleNextClick}
                    className="flex-1 !w-auto font-semibold text-[1.28rem] leading-[127.5%] tracking-[0.0298rem]"
                    style={{ fontFamily: 'Roboto, sans-serif', height: '2.98rem' }}
                >
                    Suivant
                </Button>
            </div>
        </>
    );
};

export default Step4ContactInfo;