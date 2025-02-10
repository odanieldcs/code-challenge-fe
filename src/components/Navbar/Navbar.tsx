import React from 'react';
import { CheckLogo } from '../icons/CheckLogo';

export const Navbar: React.FC = () => {
    return (
        <nav className="bg-stoneGray-300 p-7.5 w-full">
            <div className="container mx-auto flex items-center w-full text-stoneGray-800 space-x-2">
                <CheckLogo className='max-w-7.5 max-h-7.5' />
                <h1 className="text-2xl font-bold">TODO List</h1>
            </div>
        </nav>
    );
};
