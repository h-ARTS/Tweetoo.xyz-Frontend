const useA11yTabProps = name => index => {
  return {
    id: `${name}-tab-${index}`,
    'aria-controls': `${name}-tabpanel-${index}`
  };
};

export default useA11yTabProps;
