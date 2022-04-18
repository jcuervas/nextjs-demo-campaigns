import {Campaign} from '@interfaces/campaign';
import {CSSProperties} from 'react';

interface CSSVariable {
  name: string;
  value: string | number | null;
}

export const mainStyles: CSSProperties = {
  width: '100vw',
  height: '100vh',
  backgroundSize: 'cover'
};

export const cssVariables = (campaign: Campaign): CSSVariable[] => {
  const backgroundColorSolid = campaign.template.backgroundColor.replace(/[\d\.]+\)$/g, '1)');
  return [
    {
      name: '--rmd-form-text-active-color',
      value: campaign.template.textColor,
    },
    {
      name: '--rmd-theme-background',
      value: backgroundColorSolid,
    },
    {
      name: '--rmd-theme-secondary',
      value: campaign.template.textColor,
    },
    {
      name: '--rmd-theme-text-secondary-on-background',
      value: campaign.template.textColor,
    },
    {
      name: '--rmd-card-secondary-color',
      value: campaign.template.textColor,
    },
    {
      name: '--rmd-card-color',
      value: campaign.template.textColor,
    }
  ];
};

export const setupInitialEffect = (variables: CSSVariable[]) => {
  const {style} = document.documentElement;
  variables.forEach((variable) => {
    style.setProperty(variable.name, `${variable.value}`);
  });
  const googleFonts = document.createElement('link');
  googleFonts.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  googleFonts.rel = 'stylesheet';
  document.getElementsByTagName('head').item(0).appendChild(googleFonts);
  return () => {
    variables.forEach((variable) => {
      style.setProperty(variable.name, '');
    });
  };
};
