import React from "react";

export default function Button1st({ formId, btnText }) {
    return <input type="submit" form={formId} value={btnText} />;
}
