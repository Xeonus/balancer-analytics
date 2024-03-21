import React from "react";
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingWrapper = styled('div')({
    display: 'inline-block',
    animation: `${spin} 2s linear infinite`,
});


interface CustomThrobberProps {
    icon: string; // This specifies that the prop `icon` should be a string
}

export function CustomThrobber({ icon }: CustomThrobberProps) {

    return (
        <RotatingWrapper>
            <img src={icon} alt="Icon" width="40" />
        </RotatingWrapper>
    );
}
