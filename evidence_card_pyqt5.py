# evidence_card.py 
from PyQt5 import QtWidgets, QtCore

class EvidenceCard(QtWidgets.QWidget):
    def __init__(self, item, parent=None):
        super().__init__(parent)
        # item is a dict matching manifest.files entry
        layout = QtWidgets.QVBoxLayout(self)

        header = QtWidgets.QHBoxLayout()
        title = QtWidgets.QLabel(item['path'].split('/')[-1])
        risk = QtWidgets.QLabel("HIGH")  # compute risk externally
        risk.setStyleSheet("color: red; font-weight:bold")
        header.addWidget(title)
        header.addStretch()
        header.addWidget(risk)
        layout.addLayout(header)

        meta = QtWidgets.QLabel(
            f"Path: {item['path']}\nSHA256: {item['sha256']}\nSize: {item['size_bytes']} bytes\nMtime: {item['mtime']}"
        )
        layout.addWidget(meta)

        snippet = QtWidgets.QTextEdit(item.get('snippet',''))
        snippet.setReadOnly(True)
        snippet.setMaximumHeight(100)
        layout.addWidget(snippet)

        llm_reason = QtWidgets.QLabel("Reason: " + item.get('llm_reason','No reason'))
        layout.addWidget(llm_reason)

        btns = QtWidgets.QHBoxLayout()
        btns.addWidget(QtWidgets.QPushButton("View file"))
        btns.addWidget(QtWidgets.QPushButton("Add note"))
        btns.addWidget(QtWidgets.QPushButton("Mark FP"))
        btns.addStretch()
        layout.addLayout(btns)

# Quick run for testing
if __name__ == "__main__":
    import sys, json
    app = QtWidgets.QApplication(sys.argv)
    sample = {
        "path": "/data/data/com.whatsapp/databases/msgstore.db",
        "sha256": "abcd1234",
        "size_bytes": 12345,
        "mtime": "2025-10-10T12:34:56Z",
        "snippet": "CREATE TABLE messages (...)",
        "llm_reason": "Contains chat backup likely linked to account X"
    }
    w = EvidenceCard(sample)
    w.show()
    sys.exit(app.exec_())
