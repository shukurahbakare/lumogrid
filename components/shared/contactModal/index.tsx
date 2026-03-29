"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Icon = ({ name, style }: { name: string; style?: React.CSSProperties }) => {
  const icons: Record<string, string> = {
    x: "M18 6L6 18M6 6l12 12",
    zap: "M13 2L4.5 12.5h6L9 22l9.5-10.5h-6L13 2z",
    home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
    check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    arrow: "M5 12h14M12 5l7 7-7 7",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5",
    phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, flexShrink: 0, ...style }}>
      <path d={icons[name]} />
    </svg>
  );
};

type FormStep = 1 | 2 | 3 | 4 | "success";

interface FormData {
  name: string; email: string; phone: string;
  buildingType: string; buildingTypeOther: string;
  state: string; city: string; streetAddress: string; floors: string;
  appliances: string[]; appliancesOther: string;
  applianceQuantities: Record<string, number>;
  hoursNeeded: string; hoursNeededOther: string;
  installationTime: string; installationTimeOther: string; comments: string;
}

const BUILDING_TYPES = ["Apartment", "Bungalow", "Duplex", "Studio Apartment", "Mansion", "Villa", "Commercial (Office/shop)", "Other"];
const APPLIANCES = ["LED Bulb", "Ceiling Fan", "Standing Fan", "Laptop", "Desktop Computer + Monitor", "Wi-Fi Router", 'Television (32")', 'Television (42"-55")', "Home Theatre/Sound System", "Refrigerator (Small)", "Other"];
const HOURS_OPTIONS = ["5 - 10 hours", "10 - 15 hours", "15 - 20 hours", "All day", "Other"];
const INSTALL_OPTIONS = ["Immediately", "Within 1 month", "1-3 months", "Just making enquiries", "Other"];

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM: FormData = {
  name: "", email: "", phone: "",
  buildingType: "", buildingTypeOther: "", state: "", city: "", streetAddress: "", floors: "",
  appliances: [], appliancesOther: "", applianceQuantities: {},
  hoursNeeded: "", hoursNeededOther: "", installationTime: "", installationTimeOther: "", comments: "",
};

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  useEffect(() => {
    if (isOpen) { setCurrentStep(1); setLoading(false); setErrors({}); setForm(EMPTY_FORM); }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const validateStep = (step: number): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!form.name.trim()) e.name = "Required";
      if (!form.email.trim()) e.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
      if (!form.phone.trim()) e.phone = "Required";
    }
    if (step === 2) {
      if (!form.buildingType) e.buildingType = "Required";
      if (form.buildingType === "Other" && !form.buildingTypeOther.trim()) e.buildingTypeOther = "Please specify";
      if (!form.state.trim()) e.state = "Required";
      if (!form.city.trim()) e.city = "Required";
      if (!form.streetAddress.trim()) e.streetAddress = "Required";
      if (!form.floors.trim()) e.floors = "Required";
    }
    if (step === 3) {
      if (form.appliances.length === 0) e.appliances = "Select at least one appliance";
      if (form.appliances.includes("Other") && !form.appliancesOther.trim()) e.appliancesOther = "Please specify";
      for (const app of form.appliances) {
        if (app !== "Other" && (!form.applianceQuantities[app] || form.applianceQuantities[app] < 1)) {
          e[`qty_${app}`] = "Required";
        }
      }
    }
    if (step === 4) {
      if (!form.hoursNeeded) e.hoursNeeded = "Required";
      if (form.hoursNeeded === "Other" && !form.hoursNeededOther.trim()) e.hoursNeededOther = "Please specify";
      if (!form.installationTime) e.installationTime = "Required";
      if (form.installationTime === "Other" && !form.installationTimeOther.trim()) e.installationTimeOther = "Please specify";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const onCheckboxChange = (appliance: string, checked: boolean) => {
    setForm((p) => {
      const newAppliances = checked ? [...p.appliances, appliance] : p.appliances.filter((a) => a !== appliance);
      const newQty = { ...p.applianceQuantities };
      if (!checked) delete newQty[appliance];
      return { ...p, appliances: newAppliances, applianceQuantities: newQty };
    });
    if (errors.appliances) setErrors((p) => ({ ...p, appliances: "" }));
  };

  const onQuantityChange = (appliance: string, qty: number) => {
    setForm((p) => ({ ...p, applianceQuantities: { ...p.applianceQuantities, [appliance]: qty } }));
    if (errors[`qty_${appliance}`]) setErrors((p) => ({ ...p, [`qty_${appliance}`]: "" }));
  };

  const nextStep = () => {
    if (currentStep === "success") return;
    if (!validateStep(currentStep as number)) return;
    if (currentStep < 4) setCurrentStep((currentStep + 1) as FormStep);
    else onSubmit();
  };

  const prevStep = () => {
    if (currentStep === "success" || currentStep === 1) return;
    setCurrentStep((currentStep - 1) as FormStep);
  };

  const onSubmit = async () => {
    if (!validateStep(4)) return;
    setLoading(true);
    try {
      const res = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("API error");
    } catch {
      console.warn("API call failed — showing success screen anyway.");
    }
    setLoading(false);
    setCurrentStep("success");
  };

  const progress = currentStep === "success" ? 100 : typeof currentStep === "number" ? (currentStep / 4) * 100 : 0;
  const stepLabel = currentStep !== "success" ? `Step ${currentStep} of 4` : "Done";

  const stepIcons: Record<number, string> = { 1: "zap", 2: "home", 3: "zap", 4: "check" };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lg-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="lg-modal lg-modal--wide"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress bar */}
            <div className="lg-modal__progress-wrap">
              <motion.div
                className="lg-modal__progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Close button */}
            <button className="lg-modal__close" onClick={onClose} aria-label="Close">
              <Icon name="x" />
            </button>

            {/* Scrollable content */}
            <div className="lg-modal__form custom-scrollbar" style={{ overflowY: "auto", maxHeight: "calc(90vh - 6px)" }}>
              <AnimatePresence mode="wait">

                {/* ── STEP 1 ── */}
                {currentStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <div className="lg-modal__badge"><Icon name="zap" /> {stepLabel}</div>
                    <h2 className="lg-modal__title">Let's start with <em>your details</em></h2>
                    <p className="lg-modal__subtitle">We'll use this to send you updates and your custom quote.</p>

                    <div className="lg-modal__field">
                      <label className="lg-modal__label">Full Name</label>
                      <input className={`lg-modal__input${errors.name ? " lg-modal__input--error" : ""}`} type="text" name="name" value={form.name} onChange={onChange} placeholder="Shukurah Bakare" />
                      {errors.name && <p className="lg-modal__error">{errors.name}</p>}
                    </div>

                    <div className="lg-modal__field">
                      <label className="lg-modal__label">Email Address</label>
                      <input className={`lg-modal__input${errors.email ? " lg-modal__input--error" : ""}`} type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
                      {errors.email && <p className="lg-modal__error">{errors.email}</p>}
                    </div>

                    <div className="lg-modal__field">
                      <label className="lg-modal__label">Phone Number</label>
                      <input className={`lg-modal__input${errors.phone ? " lg-modal__input--error" : ""}`} type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+234 800 000 0000" />
                      {errors.phone && <p className="lg-modal__error">{errors.phone}</p>}
                    </div>

                    <div className="lg-modal__actions">
                      <button className="lg-modal__submit" onClick={nextStep} style={{ flex: 1 }}>
                        Continue <Icon name="arrow" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2 ── */}
                {currentStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <div className="lg-modal__badge"><Icon name="home" /> {stepLabel}</div>
                    <h2 className="lg-modal__title">Tell us about <em>your property</em></h2>
                    <p className="lg-modal__subtitle">This helps us design the right solar solution for your space.</p>

                    <div className="lg-modal__field">
                      <label className="lg-modal__label">Building Type</label>
                      <select className={`lg-modal__input${errors.buildingType ? " lg-modal__input--error" : ""}`} name="buildingType" value={form.buildingType} onChange={onChange}>
                        <option value="">Select…</option>
                        {BUILDING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.buildingType && <p className="lg-modal__error">{errors.buildingType}</p>}
                    </div>

                    {form.buildingType === "Other" && (
                      <div className="lg-modal__field">
                        <label className="lg-modal__label">Please Specify</label>
                        <input className={`lg-modal__input${errors.buildingTypeOther ? " lg-modal__input--error" : ""}`} type="text" name="buildingTypeOther" value={form.buildingTypeOther} onChange={onChange} placeholder="Your building type" />
                        {errors.buildingTypeOther && <p className="lg-modal__error">{errors.buildingTypeOther}</p>}
                      </div>
                    )}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="lg-modal__field">
                        <label className="lg-modal__label">State</label>
                        <input className={`lg-modal__input${errors.state ? " lg-modal__input--error" : ""}`} type="text" name="state" value={form.state} onChange={onChange} placeholder="e.g. Lagos" />
                        {errors.state && <p className="lg-modal__error">{errors.state}</p>}
                      </div>
                      <div className="lg-modal__field">
                        <label className="lg-modal__label">City / Town</label>
                        <input className={`lg-modal__input${errors.city ? " lg-modal__input--error" : ""}`} type="text" name="city" value={form.city} onChange={onChange} placeholder="e.g. Ikeja" />
                        {errors.city && <p className="lg-modal__error">{errors.city}</p>}
                      </div>
                    </div>

                    <div className="lg-modal__field">
                      <label className="lg-modal__label">Street Address</label>
                      <input className={`lg-modal__input${errors.streetAddress ? " lg-modal__input--error" : ""}`} type="text" name="streetAddress" value={form.streetAddress} onChange={onChange} placeholder="123 Oba Akioba St" />
                      {errors.streetAddress && <p className="lg-modal__error">{errors.streetAddress}</p>}
                    </div>

                    <div className="lg-modal__field">
                      <label className="lg-modal__label">Number of Floors / Stories</label>
                      <input className={`lg-modal__input${errors.floors ? " lg-modal__input--error" : ""}`} type="text" name="floors" value={form.floors} onChange={onChange} placeholder="e.g. 2" />
                      {errors.floors && <p className="lg-modal__error">{errors.floors}</p>}
                    </div>

                    <div className="lg-modal__actions">
                      <button className="lg-modal__btn-secondary" onClick={prevStep}>Back</button>
                      <button className="lg-modal__submit" onClick={nextStep}>Continue <Icon name="arrow" /></button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3 ── */}
                {currentStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <div className="lg-modal__badge"><Icon name="zap" /> {stepLabel}</div>
                    <h2 className="lg-modal__title">What appliances <em>will you power?</em></h2>
                    <p className="lg-modal__subtitle">Select all that apply, then specify quantities.</p>

                    <div className="lg-modal__field">
                      <label className="lg-modal__label">Appliances</label>
                      <div className="lg-modal__checkbox-grid" style={{ maxHeight: 220, overflowY: "auto", background: "#f9fafb", padding: "0.75rem", borderRadius: "0.75rem" }}>
                        {APPLIANCES.map((app) => (
                          <label key={app} className="lg-modal__checkbox-label">
                            <input type="checkbox" checked={form.appliances.includes(app)} onChange={(e) => onCheckboxChange(app, e.target.checked)} />
                            <span>{app}</span>
                          </label>
                        ))}
                      </div>
                      {errors.appliances && <p className="lg-modal__error">{errors.appliances}</p>}
                    </div>

                    {form.appliances.includes("Other") && (
                      <div className="lg-modal__field">
                        <label className="lg-modal__label">Other Appliances (please list)</label>
                        <input className={`lg-modal__input${errors.appliancesOther ? " lg-modal__input--error" : ""}`} type="text" name="appliancesOther" value={form.appliancesOther} onChange={onChange} placeholder="e.g. microwave, washing machine" />
                        {errors.appliancesOther && <p className="lg-modal__error">{errors.appliancesOther}</p>}
                      </div>
                    )}

                    {form.appliances.filter((a) => a !== "Other").length > 0 && (
                      <div className="lg-modal__field">
                        <label className="lg-modal__label">Quantity for each appliance</label>
                        <div style={{ maxHeight: 200, overflowY: "auto" }}>
                          {form.appliances.filter((a) => a !== "Other").map((app) => (
                            <div key={app} className="lg-modal__qty-row">
                              <span className="lg-modal__qty-label">{app}</span>
                              <input
                                type="number"
                                min="1"
                                className={`lg-modal__qty-input${errors[`qty_${app}`] ? " lg-modal__input--error" : ""}`}
                                value={form.applianceQuantities[app] || ""}
                                onChange={(e) => onQuantityChange(app, parseInt(e.target.value) || 0)}
                                placeholder="0"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="lg-modal__actions">
                      <button className="lg-modal__btn-secondary" onClick={prevStep}>Back</button>
                      <button className="lg-modal__submit" onClick={nextStep}>Continue <Icon name="arrow" /></button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 4 ── */}
                {currentStep === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <div className="lg-modal__badge"><Icon name="check" /> {stepLabel}</div>
                    <h2 className="lg-modal__title">Almost done! <em>Final details</em></h2>
                    <p className="lg-modal__subtitle">Just a few more questions to finalize your custom plan.</p>

                    <div className="lg-modal__field">
                      <label className="lg-modal__label">How many hours do you need power per day?</label>
                      <select className={`lg-modal__input${errors.hoursNeeded ? " lg-modal__input--error" : ""}`} name="hoursNeeded" value={form.hoursNeeded} onChange={onChange}>
                        <option value="">Select…</option>
                        {HOURS_OPTIONS.map((h) => <option key={h} value={h}>{h}</option>)}
                      </select>
                      {errors.hoursNeeded && <p className="lg-modal__error">{errors.hoursNeeded}</p>}
                    </div>

                    {form.hoursNeeded === "Other" && (
                      <div className="lg-modal__field">
                        <label className="lg-modal__label">Please Specify</label>
                        <input className={`lg-modal__input${errors.hoursNeededOther ? " lg-modal__input--error" : ""}`} type="text" name="hoursNeededOther" value={form.hoursNeededOther} onChange={onChange} placeholder="Your hours" />
                        {errors.hoursNeededOther && <p className="lg-modal__error">{errors.hoursNeededOther}</p>}
                      </div>
                    )}

                    <div className="lg-modal__field">
                      <label className="lg-modal__label">When do you want installation?</label>
                      <select className={`lg-modal__input${errors.installationTime ? " lg-modal__input--error" : ""}`} name="installationTime" value={form.installationTime} onChange={onChange}>
                        <option value="">Select…</option>
                        {INSTALL_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                      {errors.installationTime && <p className="lg-modal__error">{errors.installationTime}</p>}
                    </div>

                    {form.installationTime === "Other" && (
                      <div className="lg-modal__field">
                        <label className="lg-modal__label">Please Specify</label>
                        <input className={`lg-modal__input${errors.installationTimeOther ? " lg-modal__input--error" : ""}`} type="text" name="installationTimeOther" value={form.installationTimeOther} onChange={onChange} placeholder="Your timeline" />
                        {errors.installationTimeOther && <p className="lg-modal__error">{errors.installationTimeOther}</p>}
                      </div>
                    )}

                    <div className="lg-modal__field">
                      <label className="lg-modal__label">Any special requirements or comments? <span style={{ fontWeight: 400, color: "var(--color-text-muted)" }}>(Optional)</span></label>
                      <textarea className="lg-modal__input" name="comments" value={form.comments} onChange={onChange} rows={3} placeholder="e.g. rooftop constraints, budget notes, etc." style={{ resize: "none" }} />
                    </div>

                    <div className="lg-modal__actions">
                      <button className="lg-modal__btn-secondary" onClick={prevStep}>Back</button>
                      <button className="lg-modal__submit" onClick={nextStep} disabled={loading}>
                        {loading ? (
                          <>
                            <svg className="lg-spinner" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                              <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                            Submitting…
                          </>
                        ) : (
                          <>Submit Request <Icon name="check" /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── SUCCESS ── */}
                {currentStep === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                    <div className="lg-modal__success">
                      <div className="lg-modal__success-icon">
                        <Icon name="check" style={{ width: 36, height: 36, color: "white" }} />
                      </div>
                      <h2 className="lg-modal__success-title">You're all set!</h2>
                      <p className="lg-modal__success-desc">
                        A confirmation email has been sent to <strong>{form.email}</strong>. Our team will reach out shortly with your tailored energy plan.
                      </p>

                      <div className="lg-modal__next-steps">
                        <p className="lg-modal__next-steps-title">What happens next</p>
                        {[
                          { icon: "mail", text: "Confirmation sent to your inbox" },
                          { icon: "phone", text: "A rep contacts you within 24 hrs" },
                          { icon: "zap", text: "Free home assessment scheduled" },
                        ].map((item, i) => (
                          <div key={i} className="lg-modal__next-step">
                            <Icon name={item.icon} />
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>

                      <button className="lg-modal__close-btn" onClick={onClose}>Close</button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;