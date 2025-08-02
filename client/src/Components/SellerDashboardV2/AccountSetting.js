

import React, { useState, useContext, useEffect } from "react";
import FullNavbar from "./FullNavbar";
import styles from "./AccountSetting.module.css";
import { X, Camera } from "lucide-react";
import { AuthContext } from "../../AuthContext";
import { Badge } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";

export default function AccountSetting() {
  const { id: userId } = useContext(AuthContext);
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [description, setDescription] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [monthlySales, setMonthlySales] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [legalDocs, setLegalDocs] = useState([]);
  const [legalDocFiles, setLegalDocFiles] = useState([]);
  const [idCardImages, setIdCardImages] = useState([]);
  const [idCardFiles, setIdCardFiles] = useState([]);
  const [modalFile, setModalFile] = useState(null);
  const [tags, setTags] = useState([]);
  const maxLegalDocs = 5;
  const maxIdCards = 2;

  // Fetch seller profile on mount
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3001/seller/profile?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.seller) {
          setCompanyName(data.seller.companyName || "");
          setBusinessType(data.seller.businessType || "");
          setDescription(data.seller.description || "");
          setBio(data.seller.bio || "");
          setPhoneNumber(data.seller.phoneNumber || "");
          setOfficeAddress(data.seller.officeAddress || "");
          setWarehouseAddress(data.seller.warehouseAddress || "");
          setMonthlySales(data.seller.monthlySales || "");
          setFacebook(data.seller.socialLinks?.facebook || "");
          setInstagram(data.seller.socialLinks?.instagram || "");
          setLinkedin(data.seller.socialLinks?.linkedin || "");
          if (data.seller.profileImageUrl) setLogoPreview(data.seller.profileImageUrl);
          setTags(data.seller.tags || []);
        }
      });
  }, [userId]);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/"))
        return alert("Only image files allowed for logo.");
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleMultipleFileUpload = (
    event,
    setPreviews,
    setFiles,
    currentLength,
    maxLimit,
    label
  ) => {
    const files = Array.from(event.target.files);
    if (currentLength + files.length > maxLimit) {
      alert(`You can upload up to ${maxLimit} ${label}.`);
      return;
    }
    setFiles((prev) => [...prev, ...files]);
    const previews = files.map((file) => ({
      name: file.name,
      type: file.type,
      preview: URL.createObjectURL(file),
      size: file.size,
    }));
    setPreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveFile = (index, setPreviews, setFiles) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // --- SUBMIT HANDLER ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading toast
    const loadingToast = toast.loading('Saving changes...', {
      position: "top-center",
      style: {
        background: '#2196F3',
        color: '#fff',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '500',
        padding: '16px 20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    });

    const formData = new FormData();

    formData.append('userId', userId);

    // Get values from form fields (use refs or controlled state as needed)
    formData.append('companyName', companyName);
    formData.append('businessType', businessType);
    formData.append('description', description);
    formData.append('bio', bio);
    formData.append('phoneNumber', phoneNumber);
    formData.append('officeAddress', officeAddress);
    formData.append('warehouseAddress', warehouseAddress);
    formData.append('monthlySales', monthlySales);
    formData.append('facebook', facebook);
    formData.append('instagram', instagram);
    formData.append('linkedin', linkedin);

    // Only append the logo file if selected
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    // Prepare legalDocs and cnicDocs as arrays of objects
    const legalDocsArr = legalDocFiles.map(file => ({
      url: file.preview || '',
      name: file.name,
      type: file.type,
    }));
    const cnicDocsArr = idCardFiles.map(file => ({
      url: file.preview || '',
      name: file.name,
      type: file.type,
    }));

    formData.append('legalDocs', JSON.stringify(legalDocsArr));
    formData.append('cnicDocs', JSON.stringify(cnicDocsArr));

    // Send the request
    try {
      const response = await fetch('http://localhost:3001/seller/profile', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (response.ok) {
        // Show success toast
        toast.success('Profile updated successfully!', {
          duration: 4000,
          position: "top-center",
          style: {
            background: '#4CAF50',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '500',
            padding: '16px 20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#4CAF50',
          },
        });
        // Optionally, re-fetch the profile to update the form
      } else {
        const errorMessage = data.error || 'Unknown error occurred';
        // Show error toast
        toast.error(`Error: ${errorMessage}`, {
          duration: 4000,
          position: "top-center",
          style: {
            background: '#f44336',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '500',
            padding: '16px 20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#f44336',
          },
        });
      }
    } catch (err) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Show network error toast
      toast.error(`Network error: ${err.message}`, {
        duration: 4000,
        position: "top-center",
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f44336',
        },
      });
    }
  };

  return (
    <>
      {/* Toast Container */}
      <Toaster />
      
      {/* <div className="container-fluid m-0 p-0 navbar-dark bg-dark shadow">
        <FullNavbar />
      </div> */}

      <div className={styles.settingsPage}>
        <div className={styles.settingsContainer}>
          <div className={`${styles.card} shadow-lg`}>
            <div className={styles.header}>
              <div className={styles.logoWrapper} style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={
                    logoPreview ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&s"
                  }
                  alt="Logo"
                  className={styles.logo}
                />
                {/* Camera upload button here */}
                <div className={styles.fileUploadWrapper}>
                  <input
                    type="file"
                    id="logoUpload"
                    className={styles.fileInputLogo}
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  <label
                    htmlFor="logoUpload"
                    className={styles.fileUploadLabel}
                    title="Change Logo"
                  >
                    <Camera size={22} strokeWidth={2.2} />
                  </label>
                </div>
                {/* BADGES: */}
                {tags.length > 0 && (
                  <div style={{
                    position: "absolute",
                    left: "100%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    marginLeft: "10px",
                    display: "flex",
                    gap: "6px"
                  }}>
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        bg={
                          tag === "registered" ? "secondary" :
                          tag === "verified" ? "info" :
                          tag === "gold" ? "warning" : "dark"
                        }
                        style={{
                          fontSize: "0.95rem",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          padding: "0.35em 0.8em"
                        }}
                      >
                        {tag === "verified" ? (
                          <>
                            <span style={{ marginRight: 4, fontWeight: 700 }}>✔</span>
                            Verified
                          </>
                        ) : (
                          tag.charAt(0).toUpperCase() + tag.slice(1)
                        )}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <h2 className={styles.title}>Seller Account Settings</h2>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="companyName" className={styles.label}>
                    Company or Store Name
                  </label>
                  <input
                    name="companyName"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className={styles.input}
                    placeholder="Enter company or shop name..."
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="businessType" className={styles.label}>
                    Business Type
                  </label>
                  <select
                    name="businessType"
                    value={businessType}
                    onChange={e => setBusinessType(e.target.value)}
                    className={styles.select}
                    required
                  >
                    <option value="">Select business type</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="supplier">Supplier</option>
                    <option value="wholeseller">Wholesaler</option>
                    <option value="distributor">Distributor</option>
                    <option value="retailer">Retailer</option>
                  </select>
                </div>
              </div>

              <div className={styles.textareaWrapper}>
                <label htmlFor="description" className={styles.labeltextarea}>
                  About Your Business
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className={styles.textarea}
                  placeholder="Enter details here..."
                  rows="5"
                  maxLength="500"
                  required
                ></textarea>
              </div>

              {/* ✅ New Bio Field */}
              <div className={styles.textareaWrapper}>
                <label htmlFor="bio" className={styles.labeltextarea}>
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className={styles.textarea}
                  placeholder="Write something about yourself or your company..."
                  rows="4"
                  maxLength="300"
                  required
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Social Media Links</label>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="url"
                      name="facebook"
                      value={facebook}
                      onChange={e => setFacebook(e.target.value)}
                      className={styles.input}
                      placeholder="Facebook URL"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="url"
                      name="instagram"
                      value={instagram}
                      onChange={e => setInstagram(e.target.value)}
                      className={styles.input}
                      placeholder="Instagram URL"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="url"
                      name="linkedin"
                      value={linkedin}
                      onChange={e => setLinkedin(e.target.value)}
                      className={styles.input}
                      placeholder="LinkedIn URL"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phoneNumber" className={styles.label}>
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="officeAddress" className={styles.label}>
                    Office Address
                  </label>
                  <input
                    name="officeAddress"
                    value={officeAddress}
                    onChange={e => setOfficeAddress(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your office address"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="warehouseAddress" className={styles.label}>
                    Warehouse Address
                  </label>
                  <input
                    name="warehouseAddress"
                    value={warehouseAddress}
                    onChange={e => setWarehouseAddress(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your warehouse address"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="sales" className={styles.label}>
                    Accumulative Sales (Monthly)
                  </label>
                  <input
                    name="sales"
                    value={monthlySales}
                    onChange={e => setMonthlySales(e.target.value)}
                    className={styles.input}
                    placeholder="Enter your sales"
                    required
                  />
                </div>
              </div>

              {/* Legal Documents and CNIC Sections remain unchanged */}
              {/* ...rest of the file upload UI... */}

              <div className={styles.formGroup}>
                <label htmlFor="secpDocuments" className={styles.label}>
                  Company Legal Documents <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  id="secpDocuments"
                  className={styles.fileInput}
                  accept="image/*,application/pdf"
                  multiple
                  required
                  onChange={(e) =>
                    handleMultipleFileUpload(
                      e,
                      setLegalDocs,
                      setLegalDocFiles,
                      legalDocs.length,
                      maxLegalDocs,
                      "legal documents"
                    )
                  }
                />
                <p className="text-muted small">
                  Max {maxLegalDocs} files allowed. JPG, PNG, PDF only.
                </p>
                <div className="d-flex flex-wrap gap-2 my-2">
                  {legalDocs.map((file, idx) => (
                    <div
                      key={idx}
                      className="position-relative"
                      style={{ width: 56, height: 56 }}
                    >
                      {file.type === "application/pdf" ? (
                        <div
                          onClick={() => setModalFile(file)}
                          className="w-100 h-100 bg-light d-flex align-items-center justify-content-center rounded border"
                          style={{ cursor: "pointer" }}
                        >
                          PDF
                        </div>
                      ) : (
                        <img
                          src={file.preview}
                          alt={`doc-${idx}`}
                          className="w-100 h-100 object-fit-cover rounded border"
                          style={{ cursor: "pointer" }}
                          onClick={() => setModalFile(file)}
                        />
                      )}
                      <X
                        size={16}
                        className="position-absolute top-0 end-0 text-danger bg-white rounded-circle p-1"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleRemoveFile(idx, setLegalDocs, setLegalDocFiles)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="idCard" className={styles.label}>
                  Upload CNIC (Front & Back){" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  id="idCard"
                  className={styles.fileInput}
                  accept="image/*,application/pdf"
                  multiple
                  required
                  onChange={(e) =>
                    handleMultipleFileUpload(
                      e,
                      setIdCardImages,
                      setIdCardFiles,
                      idCardImages.length,
                      maxIdCards,
                      "CNIC files"
                    )
                  }
                />
                <div className="d-flex flex-wrap gap-2 my-2">
                  {idCardImages.map((file, idx) => (
                    <div
                      key={idx}
                      className="position-relative"
                      style={{ width: 56, height: 56 }}
                    >
                      {file.type === "application/pdf" ? (
                        <div
                          onClick={() => setModalFile(file)}
                          className="w-100 h-100 bg-light d-flex align-items-center justify-content-center rounded border"
                          style={{ cursor: "pointer" }}
                        >
                          PDF
                        </div>
                      ) : (
                        <img
                          src={file.preview}
                          alt={`id-${idx}`}
                          className="w-100 h-100 object-fit-cover rounded border"
                          style={{ cursor: "pointer" }}
                          onClick={() => setModalFile(file)}
                        />
                      )}
                      <X
                        size={16}
                        className="position-absolute top-0 end-0 text-danger bg-white rounded-circle p-1"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleRemoveFile(idx, setIdCardImages, setIdCardFiles)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <div className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      id="policy"
                      className={styles.checkbox}
                      required
                    />
                    <label htmlFor="policy" className={styles.checkboxLabel}>
                      I agree to the{" "}
                      <a href="#" className={styles.policyLink}>
                        terms and conditions
                      </a>
                      .
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.saveButton}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {modalFile && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", zIndex: 1050 }}
          onClick={() => setModalFile(null)}
        >
          <div
            className="bg-white p-3 rounded shadow position-relative"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <X
              size={20}
              className="position-absolute top-0 end-0 m-2 text-danger bg-light rounded-circle p-1"
              style={{ cursor: "pointer", zIndex: 1060 }}
              onClick={() => setModalFile(null)}
            />
            {modalFile.type === "application/pdf" ? (
              <>
                <iframe
                  src={modalFile.preview}
                  title="PDF Preview"
                  style={{
                    width: "100%",
                    height: "75vh",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                  }}
                />
                <div className="mt-2 text-center">
                  <a
                    href={modalFile.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    Open PDF in New Tab
                  </a>
                </div>
              </>
            ) : (
              <img
                src={modalFile.preview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  border: "4px solid white",
                  borderRadius: "10px",
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
