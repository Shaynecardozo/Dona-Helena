import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "./Landing";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // This is just a redirect to the Landing page
    // We keep it as Index for backward compatibility
  }, [navigate]);

  return <Landing />;
};

export default Index;
