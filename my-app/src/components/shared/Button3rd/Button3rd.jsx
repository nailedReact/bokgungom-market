import React from "react";

export default function Button3rd({ formId, btnText }) {
    return <input type="submit" form={formId} value={btnText} />;
}
