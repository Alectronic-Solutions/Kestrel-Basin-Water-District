from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "documents"

PRIMARY = colors.HexColor("#123B5D")
ACCENT = colors.HexColor("#C98B16")
SLATE = colors.HexColor("#1D2935")

FORMS = [
    ("F-101", "Application for Water Service", "Customer account"),
    ("F-102", "Request to Stop Service", "Customer account"),
    ("F-103", "Authorized User Designation", "Customer account"),
    ("F-104", "Automatic Payment Enrollment", "Customer account"),
    ("F-105", "Mailing Address Change", "Customer account"),
    ("F-204", "Payment Arrangement Request", "Billing and payment"),
    ("F-205", "Leak Adjustment Request", "Billing and payment"),
    ("F-206", "Low-Income Assistance Application", "Billing and payment"),
    ("F-207", "Returned Payment Review", "Billing and payment"),
    ("F-306", "Conservation Rebate Application", "Conservation"),
    ("F-307", "Landscape Conversion Pre-Approval", "Conservation"),
    ("F-308", "Water Use Variance Request", "Conservation"),
    ("F-309", "Pool Fill Notification", "Conservation"),
    ("F-401", "Development Service Request", "Development and permits"),
    ("F-402", "Plan Review Submittal Checklist", "Development and permits"),
    ("F-403", "Water Main Encroachment Permit", "Development and permits"),
    ("F-404", "Hydrant Meter Rental Agreement", "Development and permits"),
    ("F-405", "Fire Flow Information Request", "Development and permits"),
    ("F-409", "Backflow Test Report", "Water quality"),
    ("F-410", "Cross-Connection Survey", "Water quality"),
    ("F-411", "Water Quality Concern Report", "Water quality"),
    ("F-501", "Public Records Request", "District government"),
    ("F-502", "Board Agenda Item Request", "District government"),
    ("F-503", "Claim Against the District", "District government"),
    ("F-601", "Employment Application", "Employment"),
    ("F-602", "Volunteer Interest Form", "Employment"),
]

MEETINGS = [
    "2026-08-12-regular", "2026-08-26-regular", "2026-09-09-regular", "2026-09-23-regular",
    "2026-07-22-regular", "2026-07-08-regular", "2026-06-24-regular", "2026-06-10-regular",
    "2026-05-27-regular", "2026-05-13-regular", "2026-04-22-regular", "2026-04-08-regular",
    "2026-03-25-regular", "2026-03-11-regular",
]
MINUTES = MEETINGS[4:]

def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("Title", parent=base["Title"], fontName="Helvetica-Bold", fontSize=22, leading=27, textColor=PRIMARY, spaceAfter=14),
        "subtitle": ParagraphStyle("Subtitle", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=PRIMARY, spaceAfter=12),
        "heading": ParagraphStyle("Heading", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=PRIMARY, spaceBefore=12, spaceAfter=7),
        "body": ParagraphStyle("Body", parent=base["BodyText"], fontName="Helvetica", fontSize=10.5, leading=15, textColor=SLATE, spaceAfter=8),
        "note": ParagraphStyle("Note", parent=base["BodyText"], fontName="Helvetica", fontSize=8.5, leading=11, textColor=SLATE, alignment=TA_CENTER),
    }

def footer(canvas, document):
    canvas.saveState()
    canvas.setStrokeColor(PRIMARY)
    canvas.setLineWidth(0.5)
    canvas.line(0.65 * inch, 0.55 * inch, 7.85 * inch, 0.55 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(SLATE)
    canvas.drawString(0.65 * inch, 0.37 * inch, "Kestrel Basin Water District demonstration document")
    canvas.drawRightString(7.85 * inch, 0.37 * inch, f"Page {document.page}")
    canvas.restoreState()

def build(path, title, subject, rows, intro):
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(path), pagesize=letter, rightMargin=0.65 * inch, leftMargin=0.65 * inch, topMargin=0.65 * inch, bottomMargin=0.8 * inch, title=title, author="Kestrel Basin Water District")
    s = styles()
    story = [
        Paragraph("Kestrel Basin Water District", s["subtitle"]),
        Paragraph(title, s["title"]),
        Paragraph("Fictional demonstration material. This document is not an official form, record, notice, or determination.", s["note"]),
        Spacer(1, 10),
        Paragraph(subject, s["subtitle"]),
        Paragraph(intro, s["body"]),
        Paragraph("Information", s["heading"]),
    ]
    table = Table(rows, colWidths=[1.9 * inch, 5.1 * inch], repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"), ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9), ("LEADING", (0, 0), (-1, -1), 12),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#AAB8C0")),
        ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#F1F5F7")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7), ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    story.extend([table, Paragraph("Need an alternate format?", s["heading"]), Paragraph("Call Customer Services at (555) 010-0140 or contact accessibility@kestrelbasin.example. Please identify the document title and your preferred format.", s["body"])])
    doc.build(story, onFirstPage=footer, onLaterPages=footer)

def create_forms():
    for form_id, title, category in FORMS:
        build(OUT / "forms" / f"{form_id}.pdf", title, f"{form_id} | {category}", [["Field", "Response"], ["Applicant or account holder", "_______________________________________________"], ["Service address", "_______________________________________________"], ["Account number, if available", "_______________________________________________"], ["Request details", "Provide the information needed to process this demonstration request."], ["Acknowledgment", "I understand this is a fictional demonstration form and will not be submitted."]], "Use this template to understand the information a district may request. The static demonstration website does not transmit submitted information.")

def create_meeting_documents():
    for meeting_id in MEETINGS:
        build(OUT / "agendas" / f"{meeting_id}.pdf", "Board of Directors Regular Meeting Agenda", f"Meeting identifier: {meeting_id}", [["Item", "Description"], ["1. Call to order", "Roll call and confirmation of a quorum."], ["2. Public comment", "Public comment on matters within the Board's jurisdiction."], ["3. Consent calendar", "Approval of prior meeting minutes and routine administrative items."], ["4. Water reliability update", "Operations and capital-project update."], ["5. Adjournment", "The next regular meeting is listed on the District website."]], "This agenda is a fictional example that illustrates how a meeting packet can be clearly organized and made available to the public.")
    for meeting_id in MINUTES:
        build(OUT / "minutes" / f"{meeting_id}.pdf", "Board of Directors Regular Meeting Minutes", f"Meeting identifier: {meeting_id}", [["Agenda item", "Action or summary"], ["Call to order", "The Chair called the meeting to order and a quorum was present."], ["Public comment", "Public comments were received and entered into the record."], ["Consent calendar", "Approved by a fictional unanimous vote."], ["Water reliability update", "Staff presented a summary of projects and operational conditions."], ["Adjournment", "The meeting was adjourned after completion of business."]], "These fictional minutes show the level of plain-language detail that residents should be able to find and download.")

def create_transparency_documents():
    docs = [
        ("financial-transaction-report-2025.pdf", "Financial Transaction Report", "Fiscal year 2025", [["Category", "Demonstration amount"], ["Operating revenue", "$18,420,000"], ["Operating expenses", "$15,880,000"], ["Capital expenditures", "$5,410,000"], ["Ending unrestricted balance", "$8,230,000"]], "This fictional report illustrates a concise public-finance download."),
        ("compensation-report-2025.pdf", "Board and Staff Compensation Report", "Calendar year 2025", [["Position group", "Demonstration total compensation"], ["Board of Directors", "$42,000"], ["General Manager", "$241,000"], ["Executive management", "$784,000"], ["All other employees", "$6,970,000"]], "This fictional report illustrates a transparent compensation disclosure."),
        ("enterprise-system-catalog-2026.pdf", "Enterprise System Catalog", "Annual update 2026", [["System", "Purpose"], ["Customer information system", "Billing, account service, and payment records."], ["Asset management system", "Maintenance history and capital planning."], ["Board agenda management", "Meeting packets, agendas, and minutes."], ["Document repository", "Public notices, policies, and records management."]], "This fictional catalog illustrates the information special districts may publish under SB 272."),
    ]
    for filename, title, subject, rows, intro in docs:
        directory = "finance" if "report" in filename else "transparency"
        build(OUT / directory / filename, title, subject, rows, intro)

if __name__ == "__main__":
    create_forms()
    create_meeting_documents()
    create_transparency_documents()
    print(f"Generated demonstration PDFs in {OUT}")
